/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpringPhysicsConfig {
  /** Mass of the physical scroll deck (standard: 1.0) */
  mass: number;
  /** Spring stiffness / tension (Hooke's constant k). Controls snapback speed. */
  stiffness: number;
  /** Viscous damping coefficient. Controls how quickly oscillations decay. */
  damping: number;
  /** Power-law exponent for velocity response. Guarantees light scroll = tiny bounce, fast scroll = big bounce. */
  velocityPower: number;
  /** Velocity at which maximum bounce compression is achieved (px/frame). Default: 68 */
  fastThreshold: number;
  /** Maximum scale compression (squish) during aggressive fast scrolls (e.g. 0.075 = 7.5%). */
  maxSquish: number;
  /** Maximum elastic rebound expansion (overshoot) when spring snaps back (e.g. 0.018 = 1.8%). */
  maxOvershoot: number;
}

export const SPRING_PRESETS: Record<'tactile' | 'bouncy' | 'silky', SpringPhysicsConfig> = {
  tactile: {
    mass: 1.0,
    stiffness: 285,
    damping: 26,
    velocityPower: 2.3, // Progressive quadratic curve: low speeds give near-zero bounce, fast speeds punch
    fastThreshold: 68,
    maxSquish: 0.078, // 7.8% max compression
    maxOvershoot: 0.018, // 1.8% elastic rebound overshoot
  },
  bouncy: {
    mass: 0.88,
    stiffness: 230,
    damping: 18,
    velocityPower: 2.1,
    fastThreshold: 60,
    maxSquish: 0.092,
    maxOvershoot: 0.025,
  },
  silky: {
    mass: 1.25,
    stiffness: 310,
    damping: 34,
    velocityPower: 2.5,
    fastThreshold: 75,
    maxSquish: 0.055,
    maxOvershoot: 0.010,
  },
};

export interface FrictionScrollOptions {
  /** Friction decay coefficient applied per frame (0.90 to 0.98). Default: 0.928 */
  friction?: number;
  /** Impulse multiplier for continuous trackpad deltas. Default: 0.42 */
  impulseFactor?: number;
  /** Base discrete wheel notch impulse (px/frame). Default: 9 */
  baseNotchImpulse?: number;
  /** Maximum allowable coasting velocity. Default: 125 */
  maxVelocity?: number;
  /** Spring physics configuration object or preset name ('tactile' | 'bouncy' | 'silky'). */
  spring?: Partial<SpringPhysicsConfig> | keyof typeof SPRING_PRESETS;
  /** Inactivity window (ms) after which continuous wheel streak resets to 1.0x. Default: 195 */
  streakTimeoutMs?: number;
  /** Momentum multiplier step added for each consecutive wheel spin in the same direction. Default: 0.28 */
  streakRampStep?: number;
  /** Maximum speed multiplier reached during continuous fast spinning. Default: 3.2 */
  maxStreakMultiplier?: number;
  /** Legacy alias for spring stiffness (Hooke's constant) */
  springTension?: number;
  /** Legacy alias for damping */
  springDamping?: number;
  /** Legacy alias for maxSquish */
  maxSquish?: number;
}

export interface FrictionScrollState {
  newTarget: number;
  newScroll: number;
  coastVelocity: number;
  dynamicScale: number;
  squishOffset: number;
  springVelocity: number;
  isMoving: boolean;
  isFastInput: boolean;
  kineticEnergy: number;
  streakMultiplier: number;
}

/**
 * High-performance spring physics engine with progressive velocity-proportional bounce.
 * - Olpo scroll (light/gentle scroll): minimal, calm bounce (< 0.2% squish, virtually flat).
 * - Beshi scroll (fast/continuous scroll): energetic, tactile bounce (up to 7.8% squish with spring overshoot).
 */
export class FrictionScroller {
  private coastVelocity = 0;
  private currentSquish = 0;
  private springVelocity = 0;
  private friction: number;
  private impulseFactor: number;
  private baseNotchImpulse: number;
  private maxVelocity: number;
  private springConfig: SpringPhysicsConfig;

  // Continuous wheel acceleration tracking ("laga tar" scroll speed ramp)
  private lastWheelTime = 0;
  private lastStreakIncrementTime = 0;
  private scrollStreak = 0;
  private continuousStreakMultiplier = 1.0;
  private lastWheelDirection = 0;
  private streakTimeoutMs: number;
  private streakRampStep: number;
  private maxStreakMultiplier: number;

  constructor(options?: FrictionScrollOptions) {
    this.friction = options?.friction ?? 0.928;
    this.impulseFactor = options?.impulseFactor ?? 0.42;
    this.baseNotchImpulse = options?.baseNotchImpulse ?? 9.2;
    this.maxVelocity = options?.maxVelocity ?? 125;
    this.streakTimeoutMs = options?.streakTimeoutMs ?? 195;
    this.streakRampStep = options?.streakRampStep ?? 0.28;
    this.maxStreakMultiplier = options?.maxStreakMultiplier ?? 3.2;

    // Resolve spring configuration from preset or custom parameters
    let resolvedSpring: SpringPhysicsConfig;
    if (typeof options?.spring === 'string' && SPRING_PRESETS[options.spring]) {
      resolvedSpring = { ...SPRING_PRESETS[options.spring] };
    } else if (typeof options?.spring === 'object') {
      resolvedSpring = { ...SPRING_PRESETS.tactile, ...options.spring };
    } else {
      resolvedSpring = { ...SPRING_PRESETS.tactile };
    }

    if (options?.springTension !== undefined) {
      resolvedSpring.stiffness = options.springTension * 1000;
    }
    if (options?.springDamping !== undefined) {
      resolvedSpring.damping = options.springDamping * 32;
    }
    if (options?.maxSquish !== undefined) {
      resolvedSpring.maxSquish = options.maxSquish;
    }

    this.springConfig = resolvedSpring;
  }

  /**
   * Updates or reconfigures the spring physics parameters at runtime
   */
  public setSpringConfig(config: Partial<SpringPhysicsConfig> | keyof typeof SPRING_PRESETS) {
    if (typeof config === 'string' && SPRING_PRESETS[config]) {
      this.springConfig = { ...SPRING_PRESETS[config] };
    } else if (typeof config === 'object') {
      this.springConfig = { ...this.springConfig, ...config };
    }
  }

  public getSpringConfig(): Readonly<SpringPhysicsConfig> {
    return this.springConfig;
  }

  /**
   * Injects kinetic momentum impulse from mouse wheel delta.
   * - Isolated single spin: gentle, controlled distance (~120px) so items stay in view.
   * - Continuous consecutive spins ("laga tar"): automatically ramps velocity up to 3.2x!
   * - Immediate direction reversal or pause: resets back to 1.0x normal speed.
   */
  public addImpulse(delta: number, timestamp = performance.now()) {
    if (Math.abs(delta) < 0.01) return;

    const direction = Math.sign(delta);
    const timeDelta = timestamp - this.lastWheelTime;
    const absDelta = Math.abs(delta);
    const isDiscreteWheel = absDelta >= 45;

    // Rate-limit streak increments for continuous trackpads (~65ms)
    const canIncrementStreak = isDiscreteWheel
      ? true
      : timestamp - this.lastStreakIncrementTime >= 65;

    // Direction reversal or pause > streakTimeoutMs resets continuous acceleration
    if (direction !== this.lastWheelDirection || timeDelta > this.streakTimeoutMs) {
      this.scrollStreak = 0;
      this.continuousStreakMultiplier = 1.0;
      this.lastStreakIncrementTime = timestamp;
    } else if (canIncrementStreak) {
      // Consecutive spins in the same direction ramp up momentum smoothly
      this.scrollStreak = Math.min(8, this.scrollStreak + 1);
      this.continuousStreakMultiplier = Math.min(
        this.maxStreakMultiplier,
        1.0 + this.scrollStreak * this.streakRampStep
      );
      this.lastStreakIncrementTime = timestamp;
    }

    this.lastWheelTime = timestamp;
    this.lastWheelDirection = direction;

    let effectiveImpulse: number;

    if (isDiscreteWheel) {
      // Discrete notched mouse wheel: base impulse of ~9 px/frame for light isolated spins
      const notchStrength = Math.max(1, Math.min(2.5, absDelta / 100));
      effectiveImpulse = direction * (this.baseNotchImpulse * notchStrength) * this.continuousStreakMultiplier;
    } else {
      // Continuous trackpad motion
      effectiveImpulse = delta * this.impulseFactor * this.continuousStreakMultiplier;
    }

    this.coastVelocity += effectiveImpulse;
    this.coastVelocity = Math.max(
      -this.maxVelocity,
      Math.min(this.maxVelocity, this.coastVelocity)
    );
  }

  /**
   * Injects fling velocity from mouse drag release
   */
  public releaseFling(velocity: number) {
    this.coastVelocity = Math.max(
      -this.maxVelocity,
      Math.min(this.maxVelocity, velocity)
    );
  }

  /**
   * Advances the physical simulation one frame.
   * Applies progressive power-law bounce: olpo scroll = olpo bounce, beshi scroll = beshi bounce.
   */
  public update(
    currentScroll: number,
    targetScroll: number,
    deltaTimeMs = 16.67
  ): FrictionScrollState {
    const dt = Math.max(0.008, Math.min(0.033, deltaTimeMs / 1000));
    let newTarget = targetScroll;

    // 1. Friction Decay of Coasting Velocity
    if (Math.abs(this.coastVelocity) > 0.02) {
      newTarget += this.coastVelocity;
      this.coastVelocity *= this.friction;
    } else {
      this.coastVelocity = 0;
    }

    // 2. Smooth Sub-pixel Position LERP
    const diff = newTarget - currentScroll;
    const scrollStep = Math.abs(diff) > 0.08 ? diff * 0.11 : diff;
    const newScroll = currentScroll + scrollStep;

    // 3. Progressive Velocity-to-Bounce Calculation
    // Total physical momentum combines coasting speed and positional delta
    const instantaneousSpeed = Math.abs(this.coastVelocity) * 0.90 + Math.abs(diff) * 0.85;
    const cfg = this.springConfig;

    // Normalized speed relative to fastThreshold (e.g. 68 px/frame)
    const normalizedSpeed = Math.min(1.0, instantaneousSpeed / Math.max(cfg.fastThreshold, 1));

    // Power-law curve (exponent: 2.3):
    // - Low speeds (light scroll): ratio is near zero (e.g. 0.20^2.3 = 0.024 -> ~0.18% squish)
    // - Medium speeds: moderate ratio (e.g. 0.50^2.3 = 0.20 -> ~1.5% squish)
    // - High speeds (fast scroll): full tactile ratio (up to 1.0 -> ~7.8% squish)
    const bounceFactor = Math.pow(normalizedSpeed, cfg.velocityPower);
    const targetSquish = cfg.maxSquish * bounceFactor;

    // Adaptive damping:
    // - Calm, high damping at low speeds to prevent visual wobble/jitter
    // - Dynamic under-damping at high speeds to allow physical spring rebound & tactile pop
    const effectiveDamping = cfg.damping * (1.25 - normalizedExcessSpeed(normalizedSpeed) * 0.35);
    const effectiveStiffness = cfg.stiffness * (0.92 + normalizedExcessSpeed(normalizedSpeed) * 0.28);

    // 4. Second-Order Damped Harmonic Spring Integration (Hooke's Law + Viscous Damping)
    const springDisplacement = this.currentSquish - targetSquish;
    const springForce = -effectiveStiffness * springDisplacement;
    const dampingForce = -effectiveDamping * this.springVelocity;
    const springAccel = (springForce + dampingForce) / Math.max(cfg.mass, 0.1);

    this.springVelocity += springAccel * dt;
    this.currentSquish += this.springVelocity * dt;

    // Elastic bounds: allow slight overshoot (negative squish up to maxOvershoot) for spring snapback
    if (this.currentSquish < -cfg.maxOvershoot) {
      this.currentSquish = -cfg.maxOvershoot;
      this.springVelocity = -this.springVelocity * 0.22;
    } else if (this.currentSquish > cfg.maxSquish) {
      this.currentSquish = cfg.maxSquish;
      this.springVelocity = 0;
    }

    const dynamicScale = Math.max(1 - cfg.maxSquish, 1 - this.currentSquish);
    const kineticEnergy = 0.5 * cfg.mass * Math.pow(this.springVelocity, 2);

    const isMoving =
      Math.abs(this.coastVelocity) > 0.02 ||
      Math.abs(diff) > 0.08 ||
      Math.abs(this.springVelocity) > 0.0003 ||
      Math.abs(this.currentSquish) > 0.0003;

    return {
      newTarget,
      newScroll,
      coastVelocity: this.coastVelocity,
      dynamicScale,
      squishOffset: this.currentSquish,
      springVelocity: this.springVelocity,
      isMoving,
      isFastInput: normalizedSpeed > 0.45,
      kineticEnergy,
      streakMultiplier: this.continuousStreakMultiplier,
    };
  }

  /**
   * Resets all internal momentum and spring velocities
   */
  public reset() {
    this.coastVelocity = 0;
    this.currentSquish = 0;
    this.springVelocity = 0;
    this.scrollStreak = 0;
    this.continuousStreakMultiplier = 1.0;
    this.lastWheelDirection = 0;
    this.lastStreakIncrementTime = 0;
  }
}

function normalizedExcessSpeed(speedRatio: number): number {
  return Math.max(0, Math.min(1, (speedRatio - 0.25) / 0.75));
}

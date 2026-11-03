import { useCallback, useState, type ImgHTMLAttributes } from 'react';

interface ProgressiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  /** Class for the wrapper box (sizing, background). */
  wrapperClassName?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Image with a loading state: shimmering skeleton until the bytes arrive, then a
 * soft fade / un-blur / settle. Images that are already cached skip the animation
 * so nothing flashes on revisit.
 */
export function ProgressiveImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  onLoad,
  ...imgProps
}: ProgressiveImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | undefined>();
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const [cachedSrc, setCachedSrc] = useState<string | undefined>();
  const loaded = loadedSrc === src;
  const failed = failedSrc === src;
  const skipAnimation = cachedSrc === src;

  // Cached images are already `complete` before React attaches onLoad.
  const imgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && node.complete && node.naturalWidth > 0) {
        setCachedSrc(src);
        setLoadedSrc(src);
      }
    },
    [src],
  );

  return (
    <div className={`relative h-full w-full overflow-hidden ${wrapperClassName}`}>
      <div className="skeleton" data-hidden={loaded || failed} aria-hidden="true" />
      <img
        {...imgProps}
        ref={imgRef}
        src={src}
        alt={alt}
        data-loaded={loaded}
        onLoad={(event) => {
          setLoadedSrc(src);
          onLoad?.(event);
        }}
        onError={() => setFailedSrc(src)}
        className={`${skipAnimation ? '' : 'img-fade'} ${failed ? 'invisible' : ''} h-full w-full ${
          className.includes('object-') ? '' : 'object-cover'
        } ${className}`}
      />
    </div>
  );
}

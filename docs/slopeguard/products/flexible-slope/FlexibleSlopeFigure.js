import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './figure.module.css';

export default function FlexibleSlopeFigure({
  file,
  alt = '图示',
  loading = 'lazy',
}) {
  const src = useBaseUrl(`/img/slopeguard/flexible-slope/${file}`);
  return (
    <figure className={styles.figure}>
      <img src={src} alt={alt} loading={loading} decoding="async" />
    </figure>
  );
}

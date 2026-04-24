import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './installation.module.css';

export default function InstallFigure({
  file,
  alt = '工序图示',
  loading = 'lazy',
}) {
  const src = useBaseUrl(`/img/flex-inclinometer/install/${file}`);
  return (
    <figure className={styles.figure}>
      <img src={src} alt={alt} loading={loading} decoding="async" />
    </figure>
  );
}

import styles from "./skeleton.module.css";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  margin?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  margin,
}) => <div className={styles.skeleton} style={{ width, height, margin }} />;

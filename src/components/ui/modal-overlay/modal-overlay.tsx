import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({
  onClick,
  ...rest
}: {
  onClick: () => void;
}) => <div className={styles.overlay} onClick={onClick} {...rest} />;

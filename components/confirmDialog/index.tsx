import styles from './confirmDialog.module.scss';

import React from 'react';
import { Modal } from '../modal';

export type ConfirmDialogPropsType = {
  confirmText: string,
  setOpen: (arg: boolean) => void,
  onConfirm: (e: React.MouseEvent<HTMLElement>) => void,
};

export const ConfirmDialog = (props: ConfirmDialogPropsType) => {
  const { confirmText, setOpen, onConfirm } = props;
  return (
    <Modal close={() => setOpen(false)} title="Are you sure?">
      <p className={styles.content}>{confirmText}</p>
      <div className={styles.btns}>
        <button className="btn btn_red" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button
          onClick={(e) => {
            setOpen(false);
            onConfirm(e);
          }}
          className="btn btn_red"
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};

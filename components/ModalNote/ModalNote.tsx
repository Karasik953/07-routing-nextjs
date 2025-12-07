'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import css from './ModalNote.module.css';

type Props = {
  children: ReactNode;
};

const ModalNote = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button onClick={close}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default ModalNote;

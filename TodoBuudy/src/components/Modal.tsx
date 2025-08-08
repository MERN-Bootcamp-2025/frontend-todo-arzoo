import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children
}) => {

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4'>
            <div className='bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-xl'>
                <div className='px-8 py-4'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-3xl font-semibold text-gray-800'>
                            {title}
                        </h2>
                        <button onClick={onClose} className='text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none text-2xl'>
                            &times;
                        </button>
                    </div>
                </div>
                <div className='p-8'>{children}</div>
            </div>
        </div>
    )
}

export default Modal
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

interface DeleteModelProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModel: React.FC<DeleteModelProps> = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <div className={`modal fade ${isVisible ? "show" : ""}`} tabIndex={-1} style={{ display: isVisible ? "block" : "none" }}>
      <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content delete_border_bottom">
                <div className="modal-header p-0 justify-content-center modal_top">
                    <img src="assets/images/temp_img/delete-back.png" className="delete_back"/>
                    <div className="mb-4">
                        <div className="mb-4 modaldelete_icon m-auto">
                            <img className="" src="assets/images/svg2/modal-delete.svg"/>
                        </div>
                        <h1 className="fs-26 fw-600 text_small mb_12 text-center" id="exampleModalToggleLabel2">Are you sure
                            want to delete ?</h1>

                    </div>
                </div>

                <div className="modal-footer p-0 justify-content-center">
                    <div className="gap_20 d-flex">
                        <button className="no_btn" data-bs-dismiss="modal" aria-label="Close" onClick={onCancel}>No</button>
                        <button className="yes_btn " onClick={onConfirm}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DeleteModel;

import React from 'react'

function ChangePasswordModel() {
  return (
    <div className="modal fade" id="exampleModalToggle4" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
       >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header p-0 d-block">
                    <div>
                        <div className=" mb-0 d-flex justify-content-between">
                            <h1 className="fs-22 fw-600 text_small mb-0" id="exampleModalToggleLabel2">Change
                                password</h1>
                            <button type="button" className="close_btn" data-bs-dismiss="modal" aria-label="Close"><i
                                    className="fi fi-rr-cross-circle"></i></button>
                        </div>
                        <h3 className="fs-16 fw-500 info mb-0">Set a new login password for your account</h3>
                    </div>
                </div>
                <div className="modal-body p-0">
                    <div className="mb-4 mt-4">
                        <div className="col-md-12 mb-3">
                            <div className="position-relative">
                                <i className="fi fi-rr-lock lock_icon"></i>
                                <input type="text" className="form-control password_input" placeholder="Current Password"/>
                                <i className="fi fi-rr-eye eye_icon"></i>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="position-relative">
                                <i className="fi fi-rr-lock lock_icon"></i>
                                <input type="text" className="form-control password_input" placeholder="New Password"/>
                                <i className="fi fi-rr-eye eye_icon"></i>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="position-relative">
                                <i className="fi fi-rr-lock lock_icon"></i>
                                <input type="text" className="form-control password_input" placeholder="Confirm Password"/>
                                <i className="fi fi-rr-eye-crossed eye_icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer p-0">
                    <button className="btn_primary fs-16 fw-500 w-100 m-0">Save Password</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePasswordModel
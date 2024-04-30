/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';

function AddModuleModel(props: any) {
    // State to store the module name input value
    const [module, setModule] = useState<string>('');

    // Function to handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModule(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        // Pass the module name back to the parent component
        props.parentCallback(module);
        // Reset the module name input after submission
        setModule('');
    };

    return (
        <>
            {/* Add Module MODAL */}
            <div className="modal fade" id="AddModule" aria-labelledby="exampleModalToggleLabel2" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header p-0">
                            <h2 className="fs-20 fw-600 black mb-4">ADD MODULE</h2>
                            <button type="button" id='abcd' className="close_btn d-flex justify-content-end mb-2" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fi fi-rr-cross-circle"></i>
                            </button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="mb-4">
                                <div className="">
                                    <div className="col-md-12 mb-3 ps-0 px-2">
                                        <label htmlFor="" className="modal_input_heading">Module<span className="danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control profile_edit"
                                            placeholder="Enter module name"
                                            value={module}
                                            onChange={handleInputChange} // Handle input change
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer p-0">
                            <div className="select-btn">
                                <button className="gap_6 primary_btn" onClick={handleSubmit}>Add</button> {/* Handle form submission */}
                                <img src="assets/images/svg_img/plus.svg" className="add_btn" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddModuleModel;

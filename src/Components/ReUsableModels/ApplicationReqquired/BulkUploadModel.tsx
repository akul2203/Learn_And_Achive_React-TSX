/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function BulkUploadModal() {
  return (
   <>   
    {/* <!-- Bulk Upload MODAL  --> */}
   <div className="modal fade" id="BulkUpload" aria-labelledby="exampleModalToggleLabel2"  aria-modal="true"
       role="dialog">
       <div className="modal-dialog modal-dialog-centered">
           <div className="modal-content">
               <div className="modal-header p-0 justify-content-center">
                   <h2 className="fs-20 fw-600 black mb-4 ">Bulk Upload</h2>
               </div>
               <div className="modal-body p-0">
                   <div className="mb-4">
                       <div className="position-relative  file_select_box2 mt-3">
                           <input type="file" className="input_feilds bg_light file_select" name="fileupload"/>
                           <label htmlFor="fileupload" className=""><img src="assets/images/svg2/upload-file.svg"/>
                               <h2 className="Drag_file mb-0">Drag and drop file here</h2>
                               <h3 className="file_upload_text">OR</h3>
                           </label>
                           <div className="d-flex justify-content-center Browse_Filesbtn">
                               <input type="file" className="input_feilds bg_light file_select" name="fileupload2"/>
                               <label htmlFor="fileupload2" className="">
                                   <div className="select-btn ">
                                       <button className="gap_6 primary_btn">Browse Files</button>
                                       <img src="assets/images/svg2/file2.svg" className="add_btn"/>
                                   </div>
                               </label>

                           </div>
                           <div className="bulk_text">
                               <h3>We only support CSV and Excel format here. Here's a sample of
                                   how it should look like</h3>
                               <a href="#">Click to Download Sample File</a>
                           </div>

                       </div>

                   </div>
               </div>
               <div className="modal-footer p-0 ">


               </div>
           </div>
       </div>
   </div>
   {/* <!-- Bulk Upload END --> */}
   </>
  )
}

export default BulkUploadModal
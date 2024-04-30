/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ckEditor() {
    const [editorData, setEditorData] = useState('');

    const handleEditorDataChange = (event: any, editor: { getData: () => any; }) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div>
            <h2>CKEditor</h2>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                        'imageUpload', 'blockQuote', '|',
                        'undo', 'redo'
                    ],
                    language: 'en'
                }}
                onChange={handleEditorDataChange}
            />
            <div>
                <h3>Editor Content:</h3>
                <div dangerouslySetInnerHTML={{ __html: editorData }} />
            </div>
        </div>
    );
}
export default ckEditor
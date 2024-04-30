/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TinymceEditor() {
    const editorRef = useRef(null);

    const handleEditorChange = (content: any, editor: any) => {
        // content is the updated content of the editor
        console.log('Content:', content);
    };
    return (
        <>
            <div>
                <Editor
                    apiKey='1t953jany93leslmpd9y3zu41la5pmundyan8n9ebfiwhy67'
                    onEditorChange={handleEditorChange}
                    ref={editorRef}
                    initialValue="  "
                    init={{
                        height: 150,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
        
            </div>
        </>
    );
}

export default TinymceEditor;

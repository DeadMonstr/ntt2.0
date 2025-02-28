import React, {useEffect, useRef, useState} from 'react';


import TextEditor from "entities/textEditor/TextEditor";


const TextEditorUi = React.memo(({
                                     options,
                                     onSubmit
                                 }) => {


    return (
        <TextEditor
            options={options}
            // text={textComponent?.text}
            // editorState={textComponent.editorState}
            onSubmit={onSubmit}
        />
    )

})


export default TextEditorUi;
import React, {useCallback, useEffect, useState} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';


import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {TRANSFORMERS} from "@lexical/markdown";
import {$generateHtmlFromNodes} from "@lexical/html";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {MarkdownShortcutPlugin} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';


import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHightlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

import "./textEditor.sass"

import exampleTheme from "./themes/ExampleTheme";
import {Button} from "shared/ui/button/button";
import ToolbarPlugin from "entities/textEditor/plugins/Toolbar";


const editorConfig = {
    // The editor theme
    theme: exampleTheme,
    // Handling of errors during update
    onError(error) {
        throw error;
    },
    // Any custom nodes go here
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
    ]
};


function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
}

function MyOnChangePlugin({onChange}) {

    const [editor] = useLexicalComposerContext();



    return <OnChangePlugin onChange={editorState => {
        editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            const editorState = editor.getEditorState();
            const data = {

                text: htmlString,
                editorState: editorState.toJSON(),
            }
            onChange(data)

        })
    }}/>;
}


function MyOnSubmitPlugin({onSubmit,isSubmit= true}) {
    const [editor] = useLexicalComposerContext();




    useEffect(() => {
        if (!isSubmit) {
            editor.update(() => {
                const htmlString = $generateHtmlFromNodes(editor, null);
                const editorState = editor.getEditorState();
                const data = {
                    text: htmlString,
                    editorState: editorState.toJSON(),
                }
                onSubmit(data)
            });
        }
    },[editor,isSubmit])


    const onSubmitChanges = useCallback(() => {



        editor.update(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);

            const editorState = editor.getEditorState();


            const data = {
                text: htmlString,
                editorState: editorState.toJSON(),
            }


            onSubmit(data)
        });
    }, [editor]);


    if (!isSubmit) return (
        <></>
    )

    return (
        <Button id={''} type={"submit"} onClick={onSubmitChanges}>Tasdiqlash</Button>
    )
}



function OnSetEditorState({oldEditorState}) {
    const [editor] = useLexicalComposerContext();
    const [isChanged,setIsChanged] = useState(false)



    useEffect(() => {
        console.log(oldEditorState, "oldddddddd")


        if (oldEditorState && !isChanged) {
            console.log(oldEditorState)
            const editorState = editor.parseEditorState(oldEditorState)
            editor.setEditorState(editorState);
            setIsChanged(true)
        }
    }, [oldEditorState,isChanged])


    return null
}



const TextEditor = React.memo(({onSubmit,editorState,text,title,isSubmit}) => {


    return (
        <LexicalComposer initialConfig={editorConfig}>


            <div className={"editor"}>
                <h2>{title}</h2>
                <div className="editor-container">
                    <ToolbarPlugin />
                    <div className="editor-inner">
                        <RichTextPlugin
                            contentEditable={<ContentEditable className="editor-input"/>}
                            placeholder={<Placeholder/>}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <HistoryPlugin/>
                        <AutoFocusPlugin/>
                        <CodeHighlightPlugin/>
                        <ListPlugin/>
                        <LinkPlugin/>
                        <AutoLinkPlugin/>
                        <ListMaxIndentLevelPlugin maxDepth={7}/>
                        <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
                        <OnSetEditorState text={text} oldEditorState={editorState}/>
                    </div>
                    {
                        isSubmit ?
                            <MyOnSubmitPlugin isSubmit={isSubmit}  onSubmit={onSubmit}/>
                            :
                            <MyOnChangePlugin onChange={onSubmit}/>
                    }

                </div>
            </div>
        </LexicalComposer>
    );
}) ;
export default TextEditor;
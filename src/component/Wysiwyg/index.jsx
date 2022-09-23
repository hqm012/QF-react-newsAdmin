import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './index.scss'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'

export default function Wysiwyg(props) {
    const [editorState, setEditorState] = useState('')

    const handleBlur = () => {
        props.getContent(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
        )
    }

    useEffect(() => {
        // console.log(props);
        const html = props.content
        if (!html) return
        const contentBlock = htmlToDraft(html)
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            setEditorState(editorState)
        }
    }, [props.content])
    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(value) => {
                setEditorState(value)
                // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
            }}
            onBlur={handleBlur}
        />
    )
}

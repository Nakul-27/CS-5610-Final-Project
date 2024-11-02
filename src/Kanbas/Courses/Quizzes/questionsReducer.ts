import { createSlice } from "@reduxjs/toolkit";
import quizzes from "../../Database/quizzes.json"

const initialState = {
    questions: quizzes.flatMap(quiz => quiz.questions),
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        addQuestion: (state, action) => {
            const newQuestion: any = {
                _id: action.payload._id,
                title: action.payload.title,
                type: action.payload.type,
                points: action.payload.points,
                description: action.payload.description,
                answers: action.payload.answers,
                correct_answer: action.payload.correct_answer,
            };
            state.questions=[...state.questions, newQuestion];

        },
        deleteQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.filter((q:any) => q._id !==questionId)

        },

        updateQuestion: (state, { payload: updatedQuestion }) => {
            state.questions = state.questions.map((q: any) =>
                q._id === updatedQuestion._id ? updatedQuestion : q
            );
        },
        editQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.map((q: any) =>
                q._id === questionId ? { ...q, editing: true } : q
            ) as any;
        }
    }
});

export const { addQuestion, deleteQuestion, updateQuestion, editQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
'use strict'; 
import { db } from "@/db"
// import { useState } from "react";

export default async function CreateQuestion () {
    const exams = await db.exam.findMany();
    const renderExams = exams.map(exam => {
        return <option value={exam?.id}>{exam?.name}</option>
    })
    
    var newQuestionCreated = null;
    var newQuestionId = 0;
    
    const createQuestion = async (formData: FormData) => {
        'use server';
        const examId = formData.get('exam') ? parseInt(formData.get('exam') as string) : 0;
        const newQuestion = await db.question.create({
            data: {
                question: formData.get('question') as string,
                topic: formData.get('topic') as string,
                examId: examId as number
            },
            
        })
        newQuestionId = newQuestion.id;
        newQuestionCreated = newQuestion; 
    }
    
    const addAnswer = async (formData: FormData) => {
        'use server';
        const newAnswer = await db.answer.create({
            data: {
                text: formData.get('text') as string,
                right:  formData.get('right') as unknown as boolean,
                questionId: newQuestionId
            }
        })
    }

    const answers = await db.answer.findMany({
            where: {
                questionId: newQuestionId
            }
        })
        
 

    const renderAnswers = answers.map(answer => {
        return (
            <div>
                {answers.indexOf(answer)+1}. {answer.text}
            </div>
        )    
    })
    // const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="w-96 mx-auto pt-12">
            <h1 className="text-2xl font-semibold">Create a question.</h1>

            <form action={createQuestion} className="w-full flex flex-col space-y-3 mb-8">
                <div className="flex flex-col">
                    <label htmlFor="exam" >Select the exam</label>
                    <select name="exam" id="exam" className="rounded-sm border border-slate-400 py-3 px-2">
                        {renderExams}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="question" >Question</label>
                    <input type="text" id="question" name="question" className="rounded-sm border border-slate-400 py-3 px-2" />
                </div>
                <div >
                    <button type="submit" className=" border mt-1 rounded-md bg-emerald-400 px-3 py-2 float-left border-slate-800">Create</button>
                </div>
            </form>
            {newQuestionId != 0 ? <div>
                <h1 className="text-lg">{newQuestionCreated!.question}</h1>
            </div>: null}
            {renderAnswers}
            <button  className="border rounded-md bg-blue-400 border-slate-800 px-2 py-1 my-8"  >Add Answer</button> 
              
              
            <form action={addAnswer} className="w-full flex flex-col space-y-3 my-5">
                <div className="flex flex-col">
                    <label htmlFor="exam" >Select the exam</label>
                    <select name="exam" id="exam" className="rounded-sm border border-slate-400 py-3 px-2">
                        {renderExams}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="question" >Question</label>
                    <input type="text" id="question" name="question" className="rounded-sm border border-slate-400 py-3 px-2" />
                </div>
                <button type="submit" className="border rounded-md bg-emerald-400 px-3 py-2 border-slate-800">Create</button>
            </form>
        </div>
    )

}
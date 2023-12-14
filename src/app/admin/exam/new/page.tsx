import { db } from '@/db';
import { redirect } from 'next/navigation';

export default function CreateExam() {
  const addExam = async (formData: FormData) => {
    'use server';
    const newExam = await db.exam.create({
      data: {
        name: formData.get('name') as string,
      },
    });
    redirect(`/admin/exam/${newExam.id}`);
  };
  return (
    <div className="w-96 mx-auto">
      <h1 className="font-semibold text-2xl mb-4">Add an exam name</h1>
      <form action={addExam} className="w-full">
        <div className="mb-3 w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-sm border border-slate-600 py-3 px-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-sm bg-lime-400 hover:bg-slate-500 px-5 py-3"
        >
          Add
        </button>
      </form>
    </div>
  );
}

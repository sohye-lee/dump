import { db } from '@/db';

export default async function ShowExamsAll() {
  const exams = await db.exam.findMany();
  const renderExams = exams.map((exam) => {
    return (
      <div
        className="px-4 py-3 rounded bg-slate-200 flex flex-wrap justify-between items-center mb-3"
        key={exam.id}
      >
        <h1 className="text-xl">{exam ? exam?.name : 'Not found'}</h1>
        <div className="flex items-center space-x-2">
          <a
            href={`/admin/exam/${exam?.id}/edit`}
            className="px-3 py-1 border border-slate-800 rounded-md bg-slate-300 hover:bg-slate-400"
          >
            Edit
          </a>
          <a
            href={`/admin/exam/${exam?.id}/edit`}
            className="px-3 py-1 border border-slate-800 rounded-md bg-red-300 hover:bg-slate-400"
          >
            delete
          </a>
        </div>
      </div>
    );
  });
  return (
    <div>
      <a
        href="/admin/exam/new"
        className="px-3 py-1 border border-slate-800 rounded-md bg-emerald-300 mb-5 inline-block"
      >
        Add New
      </a>
      <div>{renderExams}</div>
    </div>
  );
}

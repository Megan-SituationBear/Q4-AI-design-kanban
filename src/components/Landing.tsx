import React from 'react';

interface LandingProps {
  onEnter: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          <div className="mx-auto mb-6 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.178 8.00001C16.412 6.23401 13.549 6.23401 11.784 8.00001L12 8.21601L12.216 8.00001C13.982 6.23401 16.845 6.23401 18.611 8.00001C20.377 9.76601 20.377 12.629 18.611 14.394C16.845 16.16 13.982 16.16 12.216 14.394L12 14.178L11.784 14.394C10.018 16.16 7.15497 16.16 5.38897 14.394C3.62297 12.628 3.62297 9.76601 5.38897 8.00001C7.15497 6.23401 10.018 6.23401 11.784 8.00001L12 8.21601L11.784 8.00001C10.018 6.23401 7.15497 6.23401 5.38897 8.00001C3.62297 9.76601 3.62297 12.629 5.38897 14.394C7.15497 16.16 10.018 16.16 11.784 14.394L12 14.178L12.216 14.394C13.982 16.16 16.845 16.16 18.611 14.394C20.377 12.628 20.377 9.76601 18.611 8.00001C16.845 6.23401 13.982 6.23401 12.216 8.00001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">Q4 AI Design Kanban</h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg">
            Track product design problems, proposed solutions, and progress from idea to handoff.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={onEnter}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-600 hover:shadow-md transition-all cursor-pointer"
            >
              Enter Board
            </button>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              View Docs
            </a>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-slate-200 text-center text-xs text-slate-500">
        Built with React, TypeScript and Tailwind
      </div>
    </div>
  );
};

export default Landing;



import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';

interface DeleteDepartmentDialogProps {
  departmentName: string;
  memberCount: number;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteDepartmentDialog({
  departmentName,
  memberCount,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteDepartmentDialogProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-sm font-extrabold text-neutral-900 mb-2">
            Delete Department
          </h3>
          <p className="text-xs text-neutral-500 mb-4">
            Are you sure you want to delete <span className="font-bold text-neutral-900">{departmentName}</span>? This action <span className="font-bold text-red-500">cannot be undone</span>.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-left space-y-1.5">
            <p className="text-[11px] font-bold text-amber-800 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
              What will happen:
            </p>
            <ul className="text-[11px] text-amber-700 space-y-1 pl-5 list-disc">
              <li>The department will be permanently removed.</li>
              <li>All employees under this department will be left without a department.</li>
              {memberCount > 0 && (
                <li>
                  <span className="font-semibold">{memberCount} employee{memberCount > 1 ? 's' : ''}</span> assigned to this department will be unassigned.
                </li>
              )}
              <li>All positions under this department will be deleted.</li>
            </ul>
          </div>

          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              {isDeleting ? (
                <><Hourglass size={14} /> Deleting...</>
              ) : (
                'Delete Department'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

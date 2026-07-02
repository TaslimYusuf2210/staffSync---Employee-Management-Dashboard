import { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';

const Table = ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto">
    <table className={`w-full text-left text-xs border-collapse ${className ?? ''}`} {...props} />
  </div>
);

const TableHeader = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={`border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider ${className ?? ''}`}
    {...props}
  />
);

const TableBody = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={`divide-y divide-neutral-100 ${className ?? ''}`} {...props} />
);

const TableRow = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={`hover:bg-neutral-50/50 transition-all ${className ?? ''}`} {...props} />
);

const TableHead = ({ className, ...props }: ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th className={`p-4 font-semibold text-left ${className ?? ''}`} {...props} />
);

const TableCell = ({ className, ...props }: TdHTMLAttributes<HTMLTableDataCellElement>) => (
  <td className={`p-4 ${className ?? ''}`} {...props} />
);

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };

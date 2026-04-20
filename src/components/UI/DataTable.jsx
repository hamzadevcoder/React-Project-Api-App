import React from 'react';
import clsx from 'clsx';

const DataTable = ({ columns, data, className }) => {
  return (
    <div className={clsx("overflow-x-auto rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card shadow-sm", className)}>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-dark-bg/50 border-b border-gray-200 dark:border-dark-border">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-3 font-semibold tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-dark-border/60">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50/50 dark:hover:bg-dark-border/30 transition-colors">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

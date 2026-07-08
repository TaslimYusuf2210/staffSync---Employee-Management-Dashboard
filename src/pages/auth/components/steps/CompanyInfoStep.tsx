import { useFormContext } from 'react-hook-form';
import type { RegisterFormValues } from '../../schemas/registerSchema';

export function CompanyInfoStep() {
  const { register, formState: { errors } } = useFormContext<RegisterFormValues>();
  return (
    <div className="space-y-6">
      <div className="relative group">
        <input type="text" id="companyName" placeholder="" {...register('companyName')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
            errors.companyName ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        />
        <label htmlFor="companyName" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
          Company Name
        </label>
        {errors.companyName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.companyName.message}</p>}
      </div>
      <div className="relative group">
        <select id="description" {...register('description')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 focus:outline-none transition-all duration-200 bg-transparent cursor-pointer ${
            errors.description ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        >
          <option value="" disabled hidden>Select Company Description</option>
          <option value="Corporate Headquarters">Corporate Headquarters</option>
          <option value="Branch Office">Branch Office</option>
          <option value="Regional Office">Regional Office</option>
          <option value="Startup">Startup</option>
          <option value="Small & Medium Enterprise (SME)">Small & Medium Enterprise (SME)</option>
          <option value="Large Enterprise">Large Enterprise</option>
          <option value="Multinational Company">Multinational Company</option>
          <option value="Government Agency">Government Agency</option>
          <option value="Non-Profit Organization">Non-Profit Organization</option>
          <option value="Educational Institution">Educational Institution</option>
          <option value="Healthcare Facility">Healthcare Facility</option>
          <option value="Remote / Distributed Team">Remote / Distributed Team</option>
          <option value="Agency / Consulting Firm">Agency / Consulting Firm</option>
          <option value="Manufacturing Plant">Manufacturing Plant</option>
          <option value="Retail Chain">Retail Chain</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="description" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200">
          Description / Organization Type
        </label>
        {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>}
      </div>
      <div className="relative group">
        <input type="tel" id="phoneNumber" placeholder="e.g. 08012345678" {...register('phoneNumber')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200 ${
            errors.phoneNumber ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        />
        <label htmlFor="phoneNumber" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
          Phone Number
        </label>
        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phoneNumber.message}</p>}
      </div>
      <div className="relative group">
        <input type="text" id="address" placeholder="e.g. 123 Main Street, City, Country" {...register('address')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200 ${
            errors.address ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        />
        <label htmlFor="address" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
          Address
        </label>
        {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address.message}</p>}
      </div>
    </div>
  );
}

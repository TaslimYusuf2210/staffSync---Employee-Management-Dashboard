import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApp } from '../../../context/AppContext';
import { useCurrentUser } from '../../../hooks/useCurrentUser';

const companySchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  companyEmail: z.string().email({ message: 'Please enter a valid email address' }),
  companyPhone: z.string()
    .length(11, { message: 'Phone number must be exactly 11 digits' })
    .regex(/^(?:\+234|234|0)(?:70[1-9]|80[2-9]|81[0-8]|90[1-9]|91[1-356]|702[5-9])\d{7}$/, { message: 'Please enter a valid Nigerian phone number' }),
  companyAddress: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  companyDescription: z.string().min(1, { message: 'Please select a company description / type' }),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function CompanySection() {
  const { data: currentUser } = useCurrentUser();
  const { updateSettings } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: currentUser?.data?.company?.name ?? '',
      companyEmail: currentUser?.data?.company?.email ?? '',
      companyPhone: currentUser?.data?.company?.phoneNumber ?? '',
      companyAddress: currentUser?.data?.company?.address ?? '',
      companyDescription: currentUser?.data?.company?.description ?? '',
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    updateSettings({
      company: {
        name: data.companyName,
        email: data.companyEmail,
        phoneNumber: data.companyPhone,
        address: data.companyAddress,
        description: data.companyDescription,
      },
    });
    alert('Company information updated successfully.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">
        Company Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
            Company Name
          </label>
          <input
            type="text"
            {...register('companyName')}
            className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
          />
          {errors.companyName && (
            <p className="text-red-500 text-[10px] mt-1">{errors.companyName.message}</p>
          )}
        </div>
        <div>
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
            Company Email
          </label>
          <input
            type="email"
            {...register('companyEmail')}
            className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
          />
          {errors.companyEmail && (
            <p className="text-red-500 text-[10px] mt-1">{errors.companyEmail.message}</p>
          )}
        </div>
        <div>
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
            Phone Number
          </label>
          <input
            type="text"
            {...register('companyPhone')}
            className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
          />
          {errors.companyPhone && (
            <p className="text-red-500 text-[10px] mt-1">{errors.companyPhone.message}</p>
          )}
        </div>
        <div>
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
            Address
          </label>
          <input
            type="text"
            {...register('companyAddress')}
            className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
          />
          {errors.companyAddress && (
            <p className="text-red-500 text-[10px] mt-1">{errors.companyAddress.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
          Description / Organization Type
        </label>
        <select
          {...register('companyDescription')}
          className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae] bg-white cursor-pointer"
        >
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
        {errors.companyDescription && (
          <p className="text-red-500 text-[10px] mt-1">{errors.companyDescription.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-neutral-100">
        <button
          type="submit"
          className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-sm font-bold rounded-xl transition-all cursor-pointer"
        >
          Save Company
        </button>
      </div>
    </form>
  );
}

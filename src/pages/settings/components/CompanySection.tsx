import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApp } from '../../../context/AppContext';
import { useCurrentUser } from '../../../hooks/useCurrentUser';

const companySchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  companyEmail: z.string().email({ message: 'Please enter a valid email address' }),
  companyPhone: z.string().min(6, { message: 'Phone number must be at least 6 characters' }),
  companyAddress: z.string().min(5, { message: 'Address must be at least 5 characters' }),
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
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    updateSettings({
      company: {
        name: data.companyName,
        email: data.companyEmail,
        phoneNumber: data.companyPhone,
        address: data.companyAddress,
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

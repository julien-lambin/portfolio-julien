import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Upload, X, AlertCircle } from 'lucide-react';
import { Background } from '../components/ui/Background';

type Step = 'validation' | 'design' | 'content' | 'contact' | 'success';

interface DaySchedule {
  amStart: string;
  amEnd: string;
  pmStart: string;
  pmEnd: string;
  closed: boolean;
}

type ScheduleData = Record<string, DaySchedule>;

interface FormData {
  // Step 1: Validation
  clientName: string;
  firstName: string;
  lastName: string;
  companyName: string;
  
  // Step 2: Design
  logo: File | null;
  
  // Step 3: Content
  presentation: string;
  services: string;
  photos: File[];
  
  // Step 4: Contact
  phone: string;
  email: string;
  address: string;
  hours: ScheduleData;
  socials: string;
  transferLink: string;
}

const MAX_FILE_SIZE = 512 * 1024; // 512KB to ensure total payload < 4.5MB
const MAX_PHOTOS = 3;

export const Onboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>('validation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    clientName: searchParams.get('client') || '',
    firstName: '',
    lastName: '',
    companyName: '',
    logo: null,
    presentation: '',
    services: '',
    photos: [],
    phone: '',
    email: '',
    address: '',
    hours: {
      'Lundi': { amStart: '09:00', amEnd: '12:00', pmStart: '14:00', pmEnd: '18:00', closed: false },
      'Mardi': { amStart: '09:00', amEnd: '12:00', pmStart: '14:00', pmEnd: '18:00', closed: false },
      'Mercredi': { amStart: '09:00', amEnd: '12:00', pmStart: '14:00', pmEnd: '18:00', closed: false },
      'Jeudi': { amStart: '09:00', amEnd: '12:00', pmStart: '14:00', pmEnd: '18:00', closed: false },
      'Vendredi': { amStart: '09:00', amEnd: '12:00', pmStart: '14:00', pmEnd: '18:00', closed: false },
      'Samedi': { amStart: '09:00', amEnd: '12:00', pmStart: '14:00', pmEnd: '18:00', closed: true },
      'Dimanche': { amStart: '09:00', amEnd: '12:00', pmStart: '14:00', pmEnd: '18:00', closed: true },
    },
    socials: '',
    transferLink: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (day: string, field: keyof DaySchedule, value: any) => {
    setFormData(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day],
          [field]: value
        }
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'photos') => {
    if (e.target.files && e.target.files.length > 0) {
      if (field === 'logo') {
        const file = e.target.files[0];
        if (file.size > MAX_FILE_SIZE) {
          alert("Le fichier est trop volumineux (max 512KB).");
          return;
        }
        setFormData(prev => ({ ...prev, logo: file }));
      } else {
        const newFiles = Array.from(e.target.files);
        const validFiles = newFiles.filter(f => f.size <= MAX_FILE_SIZE);
        
        if (newFiles.length !== validFiles.length) {
          alert("Certains fichiers sont trop volumineux (max 512KB).");
        }

        setFormData(prev => {
          const updatedPhotos = [...prev.photos, ...validFiles].slice(0, MAX_PHOTOS);
          return { ...prev, photos: updatedPhotos };
        });
      }
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    setError(null);
    if (currentStep === 'validation') {
        if (!formData.firstName || !formData.lastName || !formData.companyName) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        setCurrentStep('design');
    } else if (currentStep === 'design') {
        setCurrentStep('content');
    } else if (currentStep === 'content') {
        setCurrentStep('contact');
    }
  };

  const prevStep = () => {
    setError(null);
    if (currentStep === 'design') setCurrentStep('validation');
    else if (currentStep === 'content') setCurrentStep('design');
    else if (currentStep === 'contact') setCurrentStep('content');
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
        const logoBase64 = formData.logo ? await fileToBase64(formData.logo) : null;
        const photosBase64 = await Promise.all(formData.photos.map(f => fileToBase64(f)));

        const payload = {
            ...formData,
            logo: logoBase64,
            photos: photosBase64,
            logoName: formData.logo?.name,
            photoNames: formData.photos.map(f => f.name)
        };

        const response = await fetch('/api/submit-onboarding', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setCurrentStep('success');
        } else {
            setError(data.error || "Une erreur est survenue.");
        }

    } catch (err) {
        console.error(err);
        setError("Erreur de connexion au serveur.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 'validation', label: 'Infos' },
    { id: 'design', label: 'Identité' },
    { id: 'content', label: 'Contenu' },
    { id: 'contact', label: 'Contact' },
  ];

  const getStepIndex = (s: Step) => steps.findIndex(step => step.id === s);
  const progress = ((getStepIndex(currentStep) + 1) / steps.length) * 100;

  if (currentStep === 'success') {
      return (
        <div className="min-h-screen relative font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 flex items-center justify-center p-6">
            <Background />
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800 text-center max-w-md w-full relative z-10"
            >
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Check size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">C'est tout bon !</h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    Merci {formData.firstName}. J'ai bien reçu vos éléments. Je commence l'intégration et je reviens vers vous très vite !
                </p>
            </motion.div>
        </div>
      );
  }

  return (
    <div className="min-h-screen relative font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Background />
      
      <main className="relative pt-10 z-10 pb-12 px-6 max-w-4xl mx-auto flex flex-col min-h-screen justify-center">
        
        {/* Intro */}
        <div className="text-center mb-12">
            <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400 pb-2">
                    {formData.clientName ? `Bonjour ${formData.clientName} !` : "Bonjour !"}
                </span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
                La création de votre site web est sur le point de démarrer. J'ai simplement besoin de quelques éléments pour lui donner vie.
            </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 max-w-2xl mx-auto w-full px-2 md:px-0">
            <div className="flex justify-between mb-3 text-xs md:text-sm font-semibold tracking-wide uppercase text-slate-400 dark:text-slate-500">
                {steps.map((step, idx) => (
                    <span key={step.id} className={`${getStepIndex(currentStep) >= idx ? "text-blue-600 dark:text-blue-400" : ""} transition-colors duration-300 flex items-center gap-1`}>
                       <span className="hidden md:inline">{idx + 1}. </span>
                       <span className={getStepIndex(currentStep) === idx ? "inline" : "hidden md:inline"}>{step.label}</span>
                       <span className={getStepIndex(currentStep) !== idx ? "md:hidden" : "hidden"}>{idx + 1}</span>
                    </span>
                ))}
            </div>
            <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>

        {/* Form Container */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800 p-6 md:p-12 relative overflow-hidden"
        >
            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-10"
                >
                    {currentStep === 'validation' && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Vos informations</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Prénom *" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Jean" />
                                <InputField label="Nom *" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Dupont" />
                            </div>
                            <InputField label="Nom de l'entreprise *" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Mon entreprise" />
                        </div>
                    )}

                    {currentStep === 'design' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Identité Visuelle</h2>
                                <p className="text-slate-500 dark:text-slate-400">Déposer ici votre logo (si vous en avez déja un)</p>
                            </div>
                            
                            <div className="group border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer relative bg-slate-50/50 dark:bg-slate-900/50">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'logo')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col py-10 items-center pointer-events-none transition-transform group-hover:scale-105 duration-300">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <span className="font-semibold text-lg text-slate-700 dark:text-slate-200">
                                        {formData.logo ? formData.logo.name : "Glissez votre logo ici"}
                                    </span>
                                    <span className="text-sm text-slate-400 mt-2">JPG, PNG, SVG (Max 512KB)</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 'content' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Contenu du site</h2>
                                <p className="text-slate-500 dark:text-slate-400">Le cœur de votre message.</p>
                            </div>
                            
                            <TextAreaField 
                                label="Présentation (Qui êtes-vous ?)" 
                                name="presentation" 
                                value={formData.presentation} 
                                onChange={handleInputChange} 
                                placeholder="Décrivez votre activité, votre histoire, vos valeurs en quelques phrases..."
                            />

                            <TextAreaField 
                                label="Vos Services" 
                                name="services" 
                                value={formData.services} 
                                onChange={handleInputChange} 
                                placeholder="Listez ici les prestations que vous souhaitez mettre en avant..."
                            />

                             <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Vos Photos (Max 3)</label>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                    Si vos photos sont trop lourdes, merci d'utiliser <a href="https://www.swisstransfer.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">SwissTransfer</a> et de coller le lien ci-dessous.
                                </p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {formData.photos.map((photo, i) => (
                                        <div key={i} className="relative group aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
                                            <img src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                            <button 
                                                type="button"
                                                onClick={() => removePhoto(i)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg translate-y-2 group-hover:translate-y-0"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.photos.length < MAX_PHOTOS && (
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center aspect-square relative hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group">
                                             <input 
                                                type="file" 
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleFileChange(e, 'photos')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    )}
                                </div>

                                <InputField 
                                    label="Lien de transfert (SwissTransfer, WeTransfer, Drive...)" 
                                    name="transferLink" 
                                    value={formData.transferLink} 
                                    onChange={handleInputChange} 
                                    placeholder="https://www.swisstransfer.com/d/..." 
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 'contact' && (
                         <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Informations de contact</h2>
                            <p className="text-slate-500 dark:text-slate-400 -mt-6">Ces informations apparaîtront sur votre site.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Téléphone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="06..." />
                                <InputField label="Email de contact" name="email" value={formData.email} onChange={handleInputChange} placeholder="mon-entreprise@..." />
                            </div>
                            <InputField label="Adresse" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Rue de la République..." />
                            
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Horaires d'ouverture</label>
                                <ScheduleTable hours={formData.hours} onChange={handleScheduleChange} />
                            </div>

                            <InputField label="Liens vers vos réseaux sociaux" name="socials" value={formData.socials} onChange={handleInputChange} placeholder="Lien Facebook, LinkedIn, Instagram..." />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            
            {/* Error Message */}
            {error && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 flex items-center gap-3"
                >
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="font-medium">{error}</span>
                </motion.div>
            )}

            {/* Actions */}
            <div className={`mt-10 md:mt-12 flex flex-col-reverse sm:flex-row gap-4 ${currentStep !== 'validation' ? 'sm:justify-between' : 'sm:justify-end'} pt-6 border-t border-slate-100 dark:border-slate-800/50`}>
                {currentStep !== 'validation' && (
                    <button 
                        onClick={prevStep}
                        className="px-6 py-4 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        Étape précédente
                    </button>
                )}

                {currentStep === 'contact' ? (
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? 'Envoi en cours...' : 'Valider le formulaire'} 
                        {!isSubmitting && <Check size={20} />}
                    </button>
                ) : (
                    <button 
                        onClick={nextStep} 
                        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:-translate-y-1 active:scale-95 text-center"
                    >
                        Étape suivante <ChevronRight size={20} />
                    </button>
                )}
            </div>
        </motion.div>
      </main>
    </div>
  );
};

// UI Components
const InputField = ({ label, name, value, onChange, placeholder }: any) => (
    <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">{label}</label>
        <input 
            name={name} 
            value={value} 
            onChange={onChange}
            className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm" 
            placeholder={placeholder}
        />
    </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }: any) => (
    <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">{label}</label>
        <textarea 
            name={name} 
            value={value} 
            onChange={onChange}
            rows={5}
            className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none shadow-sm" 
            placeholder={placeholder}
        />
    </div>
);

const ScheduleTable = ({ hours, onChange }: { hours: ScheduleData, onChange: (day: string, field: keyof DaySchedule, value: any) => void }) => {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    
    return (
        <div className="overflow-x-auto -mx-2 md:mx-0">
            <div className="min-w-[500px] p-2">
                <div className="grid grid-cols-[100px_1fr_1fr_80px] gap-4 mb-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500">
                    <div>Jour</div>
                    <div className="text-center">Matin</div>
                    <div className="text-center">Après-midi</div>
                    <div className="text-center">Fermé</div>
                </div>
                {days.map(day => (
                    <div key={day} className={`grid grid-cols-[100px_1fr_1fr_80px] gap-4 items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800/50 last:border-0 ${hours[day].closed ? 'opacity-50' : ''}`}>
                        <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">{day}</div>
                        
                        <div className="flex items-center gap-1">
                            <input 
                                type="time" 
                                disabled={hours[day].closed}
                                value={hours[day].amStart}
                                onChange={(e) => onChange(day, 'amStart', e.target.value)}
                                className="w-full text-xs p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                            <span className="text-slate-400 text-xs">-</span>
                            <input 
                                type="time" 
                                disabled={hours[day].closed}
                                value={hours[day].amEnd}
                                onChange={(e) => onChange(day, 'amEnd', e.target.value)}
                                className="w-full text-xs p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                        </div>

                        <div className="flex items-center gap-1">
                            <input 
                                type="time" 
                                disabled={hours[day].closed}
                                value={hours[day].pmStart}
                                onChange={(e) => onChange(day, 'pmStart', e.target.value)}
                                className="w-full text-xs p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                            <span className="text-slate-400 text-xs">-</span>
                            <input 
                                type="time" 
                                disabled={hours[day].closed}
                                value={hours[day].pmEnd}
                                onChange={(e) => onChange(day, 'pmEnd', e.target.value)}
                                className="w-full text-xs p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                        </div>

                        <div className="flex justify-center">
                            <input 
                                type="checkbox"
                                checked={hours[day].closed}
                                onChange={(e) => onChange(day, 'closed', e.target.checked)}
                                className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

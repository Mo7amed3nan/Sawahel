import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

const buildFormData = (initialData = {}) => ({
  name: initialData?.name || '',
  specialty: initialData?.specialty || '',
  phone: initialData?.phone || '',
  clinicAddress: initialData?.clinicAddress || '',
  available: initialData?.available || false,
  workingDays: Array.isArray(initialData?.workingDays)
    ? initialData.workingDays.join(', ')
    : initialData?.workingDays || '',
  workingHours: initialData?.workingHours || '',
  price: initialData?.price || '',
  images: initialData?.images || [],
});

const DoctorForm = ({ initialData = {}, onSubmit, error, saving, loading }) => {
  const [formData, setFormData] = useState(buildFormData(initialData));

  useEffect(() => {
    setFormData(buildFormData(initialData));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prevData) => ({
      ...prevData,
      available: checked,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const workingDays =
            typeof formData.workingDays === 'string'
              ? formData.workingDays
                  .split(',')
                  .map((day) => day.trim())
                  .filter(Boolean)
              : formData.workingDays;
          onSubmit(e, { ...formData, workingDays });
        }}
      >
        <CardHeader className="bg-muted/50 border-b border-border">
          <CardTitle>Contact & Service Information</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Name & Specialty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Dr. Ahmed Hassan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">
                Specialty / Profession{' '}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="specialty"
                name="specialty"
                type="text"
                required
                value={formData.specialty}
                onChange={handleChange}
                placeholder="e.g. Cardiologist, Electrician"
              />
            </div>
          </div>

          {/* Phone & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinicAddress">
                Location / Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="clinicAddress"
                name="clinicAddress"
                type="text"
                required
                value={formData.clinicAddress}
                onChange={handleChange}
                placeholder="e.g. Main Street, Ras Sedr"
              />
            </div>
          </div>

          {/* Working Days & Hours */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="workingDays">
                Working Days{' '}
                <span className="text-muted-foreground font-normal">
                  (Comma separated)
                </span>
              </Label>
              <Input
                id="workingDays"
                name="workingDays"
                type="text"
                value={formData.workingDays}
                onChange={handleChange}
                placeholder="Sunday, Monday, Tuesday..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workingHours">Working Hours</Label>
              <Input
                id="workingHours"
                name="workingHours"
                type="text"
                value={formData.workingHours}
                onChange={handleChange}
                placeholder="9 AM - 5 PM"
              />
            </div>
          </div>

          {/* Price & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="price">Service Fee (EGP)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 200"
              />
            </div>

            <div className="flex items-center h-10 gap-3 px-4 bg-muted rounded-md border border-input">
              <Checkbox
                id="available"
                checked={formData.available}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="available" className="cursor-pointer font-medium">
                Currently Available / Accepting Clients
              </Label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 bg-muted/50 border-t border-border">
          {error && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto sm:min-w-50"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DoctorForm;

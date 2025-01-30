import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  User, 
  Sun, 
  Cloud, 
  Clock, 
  DollarSign, 

  Droplet,
  Target,
  AlertTriangle,

  Calendar
} from 'lucide-react';
import { SkincareFormData } from '@/types/global';

const SkincareSummary = ({ data }: { data: SkincareFormData }) => {
  const formatEnum = (str: string) => {
    return str.toLowerCase().split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const calculateCompleteness = (data: SkincareFormData) => {
    const totalFields = Object.keys(data).length;
    const filledFields = Object.values(data).filter(value => 
        // @ts-ignore
      value !== undefined && value !== null && value !== ''
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Profile Overview */}
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6 text-purple-600" />
            <span>Skincare Profile Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Skin Type:</span>
                <span>{data.skinType && formatEnum(data.skinType)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                <span className="font-medium">Skin Goals:</span>
                <div className="flex flex-wrap gap-2">
                  {data.skinGoals?.map(goal => (
                    <span key={goal} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {formatEnum(goal)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span className="font-medium">Age Group:</span>
                <span>{data.ageGroup && formatEnum(data.ageGroup)}</span>
              </div>
            </div>

            {/* Environmental Factors */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Sun Exposure:</span>
                <span>{data.sunExposureHours} hours/day</span>
              </div>

              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Climate:</span>
                <span>{data.climateType && formatEnum(data.climateType)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Routine & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              <span>Routine Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Morning Routine:</span>
              <span>{data.routineTime?.morning} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Evening Routine:</span>
              <span>{data.routineTime?.evening} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Complexity:</span>
              <span>{data.routineComplexity && formatEnum(data.routineComplexity)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-yellow-600" />
              <span>Budget Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {data.budgetAllocation && Object.entries(data.budgetAllocation).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="font-medium">{formatEnum(category)}:</span>
                <span>${amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Warnings & Preferences */}
      {data.productWarnings && data.productWarnings.length > 0 && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-100 to-orange-100">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span>Important Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {data.productWarnings.map((warning, index) => (
                <div key={index} className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700">{warning.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Profile Completion */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Profile Completion</span>
          <span className="text-sm font-medium">{calculateCompleteness(data)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${calculateCompleteness(data)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SkincareSummary;
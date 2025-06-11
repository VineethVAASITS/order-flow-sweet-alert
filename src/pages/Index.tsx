
import StepWizard from '../components/StepWizard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.1),transparent_50%),radial-gradient(circle_at_40%_40%,_rgba(120,219,255,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Order Tracking System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Track your order status in real-time with our interactive step wizard. 
            Click on any step to see status updates with beautiful notifications.
          </p>
        </div>
        
        <StepWizard />
        
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How to Use
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-medium">Click "Next Step" to progress through the order journey</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-medium">Click on any step circle to jump to that status</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-medium">Use "Cancel Order" to simulate order cancellation</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-medium">Sweet alerts will show for each status change</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

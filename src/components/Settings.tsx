import React from "react";
import { X, User, Shield, Bell, Smartphone, Camera, Key } from "lucide-react";

export type SettingsTab = "profile" | "security" | "notifications" | "privacy";

type SettingsModalProps = {
  onClose: () => void;
  currentTab: SettingsTab;
  onTabChange: React.Dispatch<React.SetStateAction<SettingsTab>>;
  userData: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  currentTab,
  onTabChange,
  userData,
}) => {
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-6 border-r border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {tabs.find((tab) => tab.id === currentTab)?.label}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {currentTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={userData.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{userData.name}</h4>
                      <p className="text-gray-500">{userData.email}</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentTab === "security" && (
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="text-yellow-600 mt-0.5" size={20} />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Security Status</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Your account security can be improved
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Password</h4>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <Key size={20} />
                      Change Password
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between py-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <Smartphone size={20} className="text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Authenticator App</p>
                          <p className="text-sm text-gray-500">
                            Use an authenticator app to generate verification codes
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentTab === "notifications" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Email Notifications</h4>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                        <span className="text-sm text-gray-700">Document verification updates</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                        <span className="text-sm text-gray-700">Security alerts</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm text-gray-700">Marketing communications</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Push Notifications</h4>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                        <span className="text-sm text-gray-700">Document sharing notifications</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                        <span className="text-sm text-gray-700">New feature announcements</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentTab === "privacy" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Document Visibility</h4>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3">
                        <input type="radio" name="visibility" className="w-4 h-4 text-blue-600" defaultChecked />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Private</p>
                          <p className="text-sm text-gray-500">Only you can see your documents</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="radio" name="visibility" className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Selective Sharing</p>
                          <p className="text-sm text-gray-500">Share documents with specific users or organizations</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Data Usage</h4>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                        <span className="text-sm text-gray-700">Allow usage analytics to improve service</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm text-gray-700">Share anonymous usage data</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

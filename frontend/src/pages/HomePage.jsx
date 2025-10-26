import { ListChecks, LogOut } from 'lucide-react';
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import showToast from '../utils/toastNotifications';
import { useDispatch } from 'react-redux';
import {logout} from "../store";

export default function HomePage() {
    const dispatch = useDispatch();
    const handleLogout = async() => {
        dispatch(logout());
        showToast("success", "Logout Successfully");
    }
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <header className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ListChecks size={36} className="text-blue-600" />
                            <h1 className="text-3xl font-bold text-gray-900">
                                Task Manager
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">anushka@gmail.com</span>
                            {/* <span className="text-sm text-gray-600">{user.email}</span> */}
                            <button
                                onClick={() => handleLogout()}
                                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-200 transition-colors"
                            >
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <TaskForm />
                    </div>
                    <div>
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    )
}

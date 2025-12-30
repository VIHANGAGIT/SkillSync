import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router';
import { 
  Code2, Video, BarChart2, Mic, MessageSquare, Shield, 
  CheckCircle2, Lock, Zap, Terminal, Brain, LayoutDashboard,
  Menu, X, ChevronRight, Play
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function HomePage() {

  const features = [
    {
      title: "VSCode-Powered Editor",
      description: "Full-featured code editor with syntax highlighting, intellisense, and secure execution environment.",
      icon: <Code2 className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "1-on-1 Video Interviews",
      description: "Seamless video calls powered by Stream, with screen sharing and recording capabilities.",
      icon: <Video className="w-6 h-6" />,
      color: "text-green-500"
    },
    {
      title: "Real-time Collaboration",
      description: "Instant chat messaging, mic & camera toggles, and synchronized coding sessions.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "text-purple-500"
    },
    {
      title: "Live Dashboard",
      description: "Track performance with real-time statistics and analytics during interviews.",
      icon: <BarChart2 className="w-6 h-6" />,
      color: "text-orange-500"
    },
    {
      title: "Practice Mode",
      description: "Solo coding challenges with test cases.",
      icon: <Brain className="w-6 h-6" />,
      color: "text-pink-500"
    },
    {
      title: "Secure & Reliable",
      description: "Room locking, secure code execution, and background job processing with Inngest.",
      icon: <Shield className="w-6 h-6" />,
      color: "text-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 font-sans selection:bg-primary selection:text-primary-content">
      <Navbar />

        {/* Hero Section */}
        <div className="hero min-h-[calc(100vh-4rem)] bg-base-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-position-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
            <div className="hero-content flex-col lg:flex-row-reverse gap-12 z-10 max-w-7xl w-full px-4">
            
            {/* Hero Image*/}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-xl perspective-1000 group">
                <div className="relative transform transition-all duration-500 group-hover:rotate-y-6 group-hover:rotate-x-6 preserve-3d">
                <div className="mockup-code bg-neutral text-neutral-content shadow-2xl transform rotate-y-12 rotate-z-2 border border-base-content/10">
                    <pre data-prefix="$"><code>npm install skillsync</code></pre> 
                    <pre data-prefix=">" className="text-warning"><code>installing...</code></pre> 
                    <pre data-prefix=">" className="text-success"><code>Done! Ready to interview.</code></pre>
                    <pre data-prefix="1"><code>{`const interview = new Interview({`}</code></pre>
                    <pre data-prefix="2"><code>{`  mode: 'live',`}</code></pre>
                    <pre data-prefix="3"><code>{`  video: true,`}</code></pre>
                    <pre data-prefix="4"><code>{`  editor: 'vscode'`}</code></pre>
                    <pre data-prefix="5"><code>{`});`}</code></pre>
                </div>
                
                {/* Hero Elements */}
                <div className="absolute -top-10 -right-10 bg-primary text-primary-content p-4 rounded-2xl shadow-xl transform translate-z-12">
                    <Video className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-secondary text-secondary-content p-4 rounded-2xl shadow-xl transform translate-z-8">
                    <Code2 className="w-8 h-8" />
                </div>
                <div className="absolute top-1/2 -right-16 bg-accent text-accent-content p-3 rounded-xl shadow-lg transform translate-z-4">
                    <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Passed</span>
                    </div>
                </div>
                </div>
                
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-3xl -z-10 rounded-full"></div>
            </div>

            <div className="flex-1 text-center lg:text-left">
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Master Your <br/> Technical Interviews
                </h1>
                <p className="py-6 text-lg text-base-content/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The ultimate platform for live coding interviews. 
                Experience a VSCode-like environment and real-time video 
                to ace your next job.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/challenges" className="btn btn-primary btn-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-500">
                    Start Coding <ChevronRight className="w-5 h-5" />
                </Link>
                <a href="#features" className="btn btn-outline btn-primary btn-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-500">
                    Learn More
                </a>
                </div>
                
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-base-content/60 text-sm font-medium">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Live Video Chat
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Built-in Code Editor
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Multiple Languages
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Everything you need to succeed</h2>
                <p className="text-base-content/60 max-w-2xl mx-auto">
                SkillSync provides a comprehensive suite of tools designed to mimic real-world interview scenarios.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                <div key={index} className="card bg-base-200 hover:bg-base-300 transition-colors duration-300 shadow-sm hover:shadow-md border border-base-content/5">
                    <div className="card-body text-center">
                    <div className={`p-3 rounded-xl bg-base-100 w-fit mb-4 mx-auto ${feature.color}`}>
                        {feature.icon}
                    </div>
                    <h3 className="card-title text-xl mb-2 mx-auto">{feature.title}</h3>
                    <p className="text-base-content/70">{feature.description}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 dark:bg-grid-slate-400/[0.05] text-neutral-content">
            <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to ace your interviews?</h2>
            <p className="mb-12 text-neutral-content/80 max-w-2xl mx-auto">
                Get started with SkillSync in three simple steps and begin your journey to interview success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="card bg-base-100 text-base-content shadow-lg">
                <div className="card-body text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="badge badge-primary badge-lg">1</div>
                    <h3 className="card-title text-xl">Sign Up</h3>
                    </div>
                    <p>Create your account and explore the platform instantly.</p>
                </div>
                </div>
                <div className="card bg-base-100 text-base-content shadow-lg">
                <div className="card-body text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="badge badge-secondary badge-lg">2</div>
                    <h3 className="card-title text-xl">Choose Challenge</h3>
                    </div>
                    <p>Select from various coding problems across different difficulty levels.</p>
                </div>
                </div>
                <div className="card bg-base-100 text-base-content shadow-lg">
                <div className="card-body text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="badge badge-accent badge-lg">3</div>
                    <h3 className="card-title text-xl">Start Coding</h3>
                    </div>
                    <p>Use our editor to solve problems and improve your skills.</p>
                </div>
                </div>
            </div>
            
            <div className="mt-12">
                <Link to="/challenges" className="btn btn-primary btn-wide btn-lg">
                Get Started Now
                </Link>
            </div>
            </div>
        </div>

        <Footer />
    </div>
  );
}

export default HomePage;
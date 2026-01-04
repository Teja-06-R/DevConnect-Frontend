import { Code2, Twitter, Youtube, Facebook, Heart, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DevConnect
              </span>
            </div>
            <p className="text-slate-600 text-sm max-w-md leading-relaxed">
              Connecting developers through meaningful collaborations. 
              No spam, no noise — just the right people to grow your career.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>for developers since 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a 
                href="#" 
                className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors group"
              >
                <div className="w-9 h-9 bg-slate-100 group-hover:bg-blue-50 rounded-lg flex items-center justify-center transition-all">
                  <Twitter className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Twitter</span>
              </a>
              <a 
                href="#" 
                className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors group"
              >
                <div className="w-9 h-9 bg-slate-100 group-hover:bg-blue-50 rounded-lg flex items-center justify-center transition-all">
                  <Youtube className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">YouTube</span>
              </a>
              <a 
                href="#" 
                className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors group"
              >
                <div className="w-9 h-9 bg-slate-100 group-hover:bg-blue-50 rounded-lg flex items-center justify-center transition-all">
                  <Github className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2026 DevConnect. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Download, Share, CheckCircle, Smartphone, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function MobileInstall() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background p-6">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">App Installed!</h1>
        <p className="text-muted-foreground text-center mb-8">
          You can now use NetPulse from your home screen
        </p>
        <Button onClick={() => navigate("/app")} className="gap-2">
          Open App
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <div className="flex flex-col items-center justify-center pt-16 pb-8 px-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-6 shadow-lg">
          <Wifi className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-center">NetPulse</h1>
        <p className="text-muted-foreground text-center mt-2">
          Install for the best experience
        </p>
      </div>

      {/* Features */}
      <div className="flex-1 px-6 pb-8">
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-card rounded-xl border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Works Offline</p>
              <p className="text-sm text-muted-foreground">View bills anytime, anywhere</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-card rounded-xl border">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Fast & Light</p>
              <p className="text-sm text-muted-foreground">No app store download needed</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-card rounded-xl border">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Share className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold">Easy Access</p>
              <p className="text-sm text-muted-foreground">Launch from home screen</p>
            </div>
          </div>
        </div>

        {/* Install Instructions */}
        {isIOS ? (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">How to Install on iOS</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">1</span>
                  <span>Tap the <strong>Share</strong> button in Safari</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">2</span>
                  <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">3</span>
                  <span>Tap <strong>"Add"</strong> to install</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        ) : deferredPrompt ? (
          <Button onClick={handleInstall} className="w-full h-14 text-lg font-semibold gap-2">
            <Download className="w-5 h-5" />
            Install App
          </Button>
        ) : (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">How to Install</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">1</span>
                  <span>Tap the <strong>menu button</strong> (⋮) in your browser</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">2</span>
                  <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">3</span>
                  <span>Confirm to install</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate("/app/login")}
            className="text-sm text-muted-foreground"
          >
            Continue in browser →
          </button>
        </div>
      </div>
    </div>
  );
}

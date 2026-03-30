import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, Activity } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './AuthView.css';

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Verification link sent to your email.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-background">
        <Activity className="bg-icon-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="auth-card glass-panel"
      >
        <div className="auth-header">
          <div className="auth-logo">
            <Shield className="logo-icon-shield" />
            <span className="logo-text">PEEKOLITIX</span>
          </div>
          <h2 className="auth-title">
            {isLogin ? 'SECURITY CLEARANCE' : 'ESTABLISH IDENTITY'}
          </h2>
          <p className="auth-subtitle">
            {isLogin ? 'Enter your credentials to access the War Room.' : 'Join the elite strategic intelligence network.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleAuth}>
          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input 
              type="email" 
              placeholder="STRATEGIC EMAIL" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={18} />
            <input 
              type="password" 
              placeholder="ACCESS CODE" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="auth-error">{error}</motion.p>}

          <button className="auth-submit-btn" disabled={loading}>
            <span>{loading ? 'VERIFYING...' : isLogin ? 'INITIATE ACCESS' : 'CREATE PROTOCOL'}</span>
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="auth-footer">
          <button className="toggle-auth-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "DON'T HAVE AN IDENTITY? CREATE ONE" : "ALREADY VERIFIED? LOGIN"}
          </button>
        </div>

        <div className="auth-security-memo">
          <Activity size={10} />
          <span>ENCRYPTED END-TO-END POINT | MARCH 2026</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthView;

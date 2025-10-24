function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-md mx-auto py-[50px] flex items-center justify-center min-h-screen">
    <div className="w-full">
      {children}
    </div>
  </div>
}

export default AuthLayout;
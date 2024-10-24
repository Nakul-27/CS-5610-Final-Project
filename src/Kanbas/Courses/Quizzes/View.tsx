import React, { createContext, useContext, useState } from "react";

const ViewContext = createContext<{ isStudentView: boolean; toggleView: () => void } | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isStudentView, setIsStudentView] = useState(true);

    const toggleView = () => {
        setIsStudentView((prev) => !prev);
    };

    return (
        <ViewContext.Provider value={{ isStudentView, toggleView }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useViewContext = () => {
    const context = useContext(ViewContext);
    if (context === undefined) {
        throw new Error("useViewContext must be used within a ViewProvider");
    }
    return context;
};
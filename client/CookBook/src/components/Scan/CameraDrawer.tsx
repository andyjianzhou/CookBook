import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

interface CameraDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CameraDrawer: React.FC<CameraDrawerProps> = ({isOpen, onClose}) => {
    return (
        <div>
            <SwipeableDrawer
                anchor="bottom"
                open={isOpen}
                onClose={onClose}
                // Add Scan functionality here
                onOpen={() => {}}
            >
                <div>Camera</div>
            </SwipeableDrawer>
        </div>
    )
}

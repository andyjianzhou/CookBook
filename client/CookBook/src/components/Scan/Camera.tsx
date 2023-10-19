import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export const Camera: React.FC = () => {
    return (
        <div>
            <SwipeableDrawer
                anchor="bottom"
                open={true}
                onClose={() => {}}
                // Add Scan functionality here
                onOpen={() => {}}
            >
                <div>Camera</div>
            </SwipeableDrawer>
        </div>
    )
}

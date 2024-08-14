
import {NextUIProvider} from '@nextui-org/react'
function ProvidersUIComponent({children}) {
    return ( 
        <NextUIProvider>
            {children}
        </NextUIProvider>
     );
}

export default ProvidersUIComponent;
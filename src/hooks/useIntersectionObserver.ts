import { MutableRefObject, useEffect, useRef, useState } from "react";

interface Option{
    root?: Element,
    rootMargin?: string, 
    threshold?: number,
   onIntersect?(): void,

}
type HookReturnType = [ MutableRefObject<null>, IntersectionObserverEntry?]

export function useIntesectionObserver(options: Option = {}): HookReturnType{
    const {threshold= 1, root = null, rootMargin ="0px", onIntersect} = options
    
    const targetRef = useRef(null)
   const [entry, setEntry] = useState<IntersectionObserverEntry>()
    
    useEffect(()=> { 
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                const [entry] = entries;

                if(entry.isIntersecting){
                    onIntersect?.();
                   } 
                   setEntry(entry)  
         }, { threshold, root, rootMargin})
            const current = targetRef.current
        if(current){
        observer.observe(current)
        }

        return function(){
            if(current){
                observer.disconnect()
            }
        }
    }, [onIntersect, root, rootMargin, threshold])
    

    return[targetRef, entry]
}
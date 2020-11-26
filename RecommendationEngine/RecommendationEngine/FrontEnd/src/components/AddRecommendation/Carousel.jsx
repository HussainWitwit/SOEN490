import React from 'react'
import { Spring } from 'spring2'
import { Transition } from 'spring2'
import { animated } from 'spring2'

const CarouselContent = ({ children, activeIndex, prevIndex }) => (
  <Transition
    native
    keys={activeIndex}
    initial={{ x: 0 }}
    from={{
      opacity: 0,
      x: prevIndex < activeIndex ? 200 : -200
    }}
    enter={{ opacity: 1, x: 0 }}
    leave={{
      opacity: 0,
      x: prevIndex < activeIndex ? -100 : 100,
      position: "absolute",
      pointerEvents: "none"
    }}
    delay={1}
  >
    {({ x, ...rest }) => (
      <animated.div
        style={{
          transform: x.interpolate(val => `translate3d(${val}px,0,0)`),
          ...rest
        }}
      >
        {children[activeIndex]}
      </animated.div>
    )}
  </Transition>
)

const HeightTransition = ({ children }) => (
  <Spring native force from={{ height: "auto" }} to={{ height: "auto" }}>
    {styles => <animated.div style={styles}>{children}</animated.div>}
  </Spring>
)

function Carousel({children}) {

  const [state, setState] = React.useState({activeIndex: 0, prevIndex:-1});

  const select = index => {
    setState(prevState => ({
      prevIndex: prevState.activeIndex,
      activeIndex: index
    }))
  }

  const getItemProps = (props = {}) => ({
    ...props,
    select: select
  })

    return (
      <HeightTransition>
        <CarouselContent
          activeIndex={state.activeIndex}
          prevIndex={state.prevIndex}
        >
          {children({
            getItemProps: getItemProps
          })}
        </CarouselContent>
      </HeightTransition>
    )
}

export default Carousel;
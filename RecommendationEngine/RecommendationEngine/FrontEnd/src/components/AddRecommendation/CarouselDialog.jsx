import React from 'react'
import styled from "styled-components"
import { Transition } from 'spring2'
import { animated } from 'spring2'

const Frame = styled(animated.div)`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Content = styled(animated.div)`
  width: 40%;
  height: 83%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  overflow: hidden;
`

const  CarouselDialog = ({ show, toggle, children }) => (<Transition
    native
    from={{
      transform: "translate3d(0,-10px,0)",
      opacity: 0
    }}
    enter={{ opacity: 1, transform: "translate3d(0,0,0)" }}
    leave={{
      opacity: 0,
      transform: "translate3d(0,10px,0)",
      pointerEvents: "none"
    }}
    delay={1}
  >
    {show &&
      (styles => (
        <Frame
          style={{
            opacity: styles.opacity,
            pointerEvents: styles.pointerEvents
          }}
          onClick={toggle}
        >
          <Content style={styles} onClick={e => e.stopPropagation()}>
            {children}
          </Content>
        </Frame>
      ))}
  </Transition>)

export default CarouselDialog

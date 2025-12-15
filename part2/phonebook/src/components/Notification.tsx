import { useState, useEffect } from 'react'
import type { Notification as NotificationType } from '../types/notification'


const Notification = ({ notification }: {notification: NotificationType}) => {
  
  const [visible, setVisible] = useState(false);

  const timer = () => {
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  useEffect(() => {
    timer()
  }, [notification.message])
  
  if (visible !== false) {
    return <div className={`message ${notification.type}`}>
      <p>{notification.message}</p>
    </div>
  
  }
}

export default Notification
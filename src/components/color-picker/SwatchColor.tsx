export function SwatchColor ({ color, onClick, className, children, style = {} }: {
  color: string,
  className?: string,
  onClick?: () => void,
  children?: any,
  style?: any
}) {
  return (
    <div className={`color ${className}`} style={{ ...style, backgroundColor: color }} onClick={onClick}>
      {children}

      <style jsx>
        {`
          .color {
            display: flex;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 15px 15px;
            background-blend-mode: difference;

            img {
              margin: auto;
              height: 15px;
              width: 15px;
              
            }
          }
        `}
      </style>
    </div>
  )
}

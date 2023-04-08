type PlayerProps = {
  videoSrc: string;
  posterImageSrc: string;
  muted: boolean;
}

export const Player = (props: PlayerProps): JSX.Element => (
  <video src={props.videoSrc} muted={props.muted} autoPlay poster={props.posterImageSrc} width="280" height="175" />
);

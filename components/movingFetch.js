/**
 *
 * @param {'moving' | 'backstage' } screen
 * @param $api
 * @return {Promise<{stage: string|null, idleState: boolean, idleVideo: string, video: string}>}
 */
export const getCurrentData = async (screen, $api) => {
  let idleVideo = ""

  let video = ""
  const idleVideoName = screen === 'moving' ? 'technology_vertical' : 'technology'
  let idleState = await $api.idle.getState('technology')
  const stage = await $api.technology.getStage()
  // show idle video if the screen is moving to start position
  idleState = idleState || stage === 'preparation'
  if (idleState) {
    idleVideo = await $api.idle.getVideo(idleVideoName)
  } else {
    video = await $api.technology.getVideo(screen, stage)
  }
  console.log(`=== loadData: ${screen}, stage: ${stage}, idleState: ${idleState}, idleVideo: ${idleVideo}, video: ${video}`)
  return {video, stage, idleState, idleVideo}
}

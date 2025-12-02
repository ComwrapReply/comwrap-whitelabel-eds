---
description: Creating author documentation on a component
alwaysApply: false
---
## How to Add a Video

> **INSTRUCTION:** Provide step-by-step instructions for adding this component in Universal Editor.

### Creating Your First Video in Universal Editor

**Step 1: Add the Video Block**

> **INSTRUCTION:** List the basic steps to add the component. Typically includes opening Universal Editor, clicking "+", and selecting the component.

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Video" from the block library
4. The video component will be inserted into your page

**Step 2: Upload and Configure Video**

> **INSTRUCTION:** Add additional steps as needed for your component. Common steps include: configuring content, adding elements, setting options, etc.

1. In the Properties panel, click on the "Video" field
2. Select or upload a video file from the asset library
3. The video will appear in the component preview
4. Optionally, add a poster image (thumbnail) that displays before the video plays

**Step 3: Edit Content**

> **INSTRUCTION:** Describe what content authors can add or edit within this component.

For this component, you can configure:
- **Video**: Upload or select a video file (MP4 format recommended)
- **Poster Image**: Add a thumbnail image that displays before video playback
- **Overlay Content**: Add text, titles, descriptions, and call-to-action buttons that appear over the video
- **Full-Screen Video Link**: Configure a separate video file that opens in full-screen modal view

**Step 4: Configure Options**

> **INSTRUCTION:** If your component has configurable options in the Properties panel, list them here.

1. Select the video block
2. In the Properties panel, configure:
   - *Video Width*: Choose 100%, 75%, or 50% of container width
   - *Autoplay*: Enable to automatically start video playback
   - *Loop*: Enable to replay video automatically when finished
   - *Muted*: Enable to mute video by default (required for autoplay in most browsers)
   - *Controls*: Enable to show video playback controls (play, pause, volume, etc.)

**Step 5: Preview and Publish**

1. Preview your video component using the preview mode
2. Test video playback on different device sizes
3. Verify autoplay behavior (if enabled) works correctly
4. Test the full-screen video modal functionality
5. Publish when ready

---

## Video Options

> **INSTRUCTION:** Document all available configuration options for this component. Remove this section if no options exist.

### Display Options

Available in the Properties panel:
- **Video Width**: Controls the width of the video player relative to its container
  - *100%*: Full width (default)
  - *75%*: Three-quarters width
  - *50%*: Half width
- **Controls**: Toggle to show or hide video playback controls
  - When enabled: Users can play, pause, adjust volume, and seek through the video
  - When disabled: Video relies on custom controls or autoplay functionality

### Playback Options

- **Autoplay**: Automatically starts video playback when the page loads
  - Note: Most browsers require the video to be muted for autoplay to work
  - On mobile devices, autoplay may be disabled by default
- **Loop**: Automatically replays the video when it reaches the end
  - Useful for background videos or continuous animations
- **Muted**: Starts the video with audio muted
  - Required for autoplay in most modern browsers
  - Users can unmute using video controls if enabled

---

## Content Guidelines

> **INSTRUCTION:** Provide specific guidance for each content type in your component. Common categories include Images, Text, Headings, etc.

### Video Files

> **INSTRUCTION:** If your component uses images, provide specifications and best practices.

**Recommended Specifications:**
- **Format**: MP4 (H.264 codec) for best browser compatibility
- **Resolution**: 
  - Desktop: 1920x1080 (Full HD) or 1280x720 (HD)
  - Mobile: 720p or 1080p depending on file size constraints
- **File Size**: 
  - Keep under 10MB for web performance
  - Consider using compressed video formats
  - Use appropriate bitrate (2-5 Mbps for HD content)
- **Duration**: 
  - Background/hero videos: 15-30 seconds recommended
  - Content videos: Keep under 2 minutes for optimal engagement
- **Aspect Ratio**: 16:9 is standard, but component supports various ratios

**Best Practices:**
- Optimize videos for web delivery to reduce load times
- Provide a poster image (thumbnail) for better initial page load performance
- Use muted autoplay for background videos to improve user experience
- Ensure videos have captions or transcripts for accessibility
- Test video playback across different browsers and devices
- Consider providing multiple video sources for different quality levels

### Poster Images (Thumbnails)

**Recommended Specifications:**
- **Size**: Match video aspect ratio (e.g., 1920x1080 for 16:9 videos)
- **Format**: JPG, PNG, or WebP
- **File Size**: Under 200KB for optimal performance
- **Content**: Should represent the video's key moment or branding

**Best Practices:**
- Use a compelling frame from the video as the poster image
- Ensure the poster image is visually clear and represents the video content
- Optimize images for web to reduce page load time
- Consider adding play button overlay in the poster image design

### Overlay Content (Text, Titles, Buttons)

**Best Practices:**
- **Titles**: Keep titles short and impactful (3-7 words)
- **Descriptions**: Keep concise (1-2 sentences maximum)
- **Contrast**: Ensure text is readable over video backgrounds (use text shadows or semi-transparent backgrounds if needed)
- **Call-to-Action**: Make buttons clear and action-oriented
- **Positioning**: Place important content in areas that won't be obscured by video controls

**Good Examples:**
- "Welcome to Our Platform" with subtitle "Discover what makes us different"
- "Watch Our Story" button over a brand video
- "Learn More" call-to-action with brief description

**Avoid:**
- ❌ Long paragraphs of text over busy video backgrounds
- ❌ Text that blends into the video content
- ❌ Multiple competing call-to-action buttons
- ❌ Overlaying content on critical parts of the video

### Full-Screen Video Links

- Configure a separate video file for full-screen modal playback
- Useful for longer-form content or detailed explanations
- The full-screen video opens in a modal overlay with custom controls
- Ensure the full-screen video is optimized for larger display

---

## Writing Tips

> **INSTRUCTION:** Provide do's and don'ts specific to content creation for this component.

### Do's ✅

- Do optimize video files for web delivery to ensure fast loading
- Do provide a high-quality poster image that represents your video
- Do use muted autoplay for background/hero videos to improve user experience
- Do test video playback across different browsers and devices before publishing
- Do keep video content concise and engaging (15-30 seconds for hero videos)
- Do ensure text overlays have sufficient contrast for readability
- Do provide captions or transcripts for video content to improve accessibility
- Do use the loop option for background videos that should play continuously

### Don'ts ❌

- Don't upload uncompressed video files (they will be too large and slow to load)
- Don't rely solely on autoplay without providing user controls
- Don't use videos with copyrighted music without proper licensing
- Don't overlay too much text or content that obscures the video
- Don't forget to test video functionality on mobile devices
- Don't use autoplay with sound (most browsers will block this)
- Don't create videos longer than necessary (keep hero videos under 30 seconds)
- Don't skip the poster image (it improves perceived page load performance)

---

## How Users Will Experience Your Video

> **INSTRUCTION:** Describe how end users will interact with and experience this component across different devices.

### Desktop Experience

- Videos display at the configured width (100%, 75%, or 50% of container)
- Autoplay videos (if enabled and muted) begin playing automatically
- Users can hover over the video to see custom play/pause controls
- Clicking the video or play button starts playback
- Full-screen video modal opens in an overlay with custom controls
- Video controls (if enabled) appear at the bottom of the video player
- Smooth transitions and animations enhance the viewing experience

### Mobile Experience

- Videos are responsive and adapt to screen width
- Autoplay behavior may be restricted by mobile browsers
- Touch-friendly controls for play/pause functionality
- Full-screen video modal provides immersive viewing experience
- Videos may use poster images more prominently on mobile to save bandwidth
- Optimized loading with metadata preload for better performance

### Accessibility Features

> **INSTRUCTION:** Document accessibility features built into this component.

- **Keyboard Navigation**: Video controls are accessible via keyboard (Tab, Enter, Space)
- **Screen Reader Support**: Video elements include proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators for interactive video controls
- **Motion Preferences**: Respects user's reduced motion preferences when configured
- **Captions Support**: Component structure supports video captions and subtitles
- **Alternative Content**: Poster images provide visual context when video cannot play

### Video-Specific Behavior

> **INSTRUCTION:** If your component has unique behavior (like auto-play, animations, etc.), document it here. Remove if not applicable.

- **Autoplay with Muted**: Videos can autoplay when muted (required by most browsers)
- **Responsive Autoplay**: On mobile devices, autoplay may be disabled and video loads with metadata only
- **Full-Screen Modal**: Clicking the overlay button opens video in a full-screen modal with custom controls
- **Play/Pause Animations**: Visual feedback when play/pause buttons are activated
- **Poster Image Fallback**: If video fails to load, poster image remains visible
- **Loop Functionality**: Videos can automatically restart when reaching the end

---

## Common Questions

> **INSTRUCTION:** Include 6-10 frequently asked questions about this component. Base these on actual user questions or anticipated confusion points.

### Q: Why isn't my video autoplaying?
**A:** Most modern browsers block autoplay with sound. To enable autoplay, you must:
1. Enable the "Muted" option in the Properties panel
2. Enable the "Autoplay" option
3. Note that mobile browsers may still restrict autoplay regardless of settings

### Q: What video formats are supported?
**A:** The component primarily supports MP4 format with H.264 codec for best browser compatibility. Other formats may work but are not guaranteed across all browsers.

### Q: Can I use YouTube or Vimeo videos?
**A:** The video component is designed for self-hosted video files. For YouTube or Vimeo embeds, consider using a different block or embedding method.

### Q: How do I add captions or subtitles to my video?
**A:** Captions should be added to the video file itself during video production, or you can use video hosting services that support caption files (SRT, VTT). The component structure supports caption display when provided with the video.

### Q: What's the difference between the teaser video and full-screen video?
**A:** The teaser video is the main video displayed in the component. The full-screen video is an optional separate video file that opens in a modal overlay when users click the overlay button. This allows you to show a preview video and a longer, detailed video separately.

### Q: Why is my video not showing on mobile devices?
**A:** Mobile browsers often restrict autoplay and may require user interaction to play videos. Ensure your video has a poster image, and consider that mobile users may need to tap to play. Test on actual mobile devices to verify behavior.

### Q: Can I control video playback programmatically?
**A:** The video component includes JavaScript that handles play/pause functionality. For advanced programmatic control, you may need to modify the component's JavaScript file, which should be done by a developer.

### Q: Why isn't the full-screen video modal working in Universal Editor?
**A:** Some interactive features like full-screen modals may not work perfectly in Universal Editor preview mode. Test the component on a published page to verify full functionality.

### Q: What's the recommended video file size?
**A:** Keep video files under 10MB for optimal web performance. For larger videos, consider using video compression tools or hosting videos on a CDN. Hero/background videos should be even smaller (under 5MB) for faster page loads.

### Q: Can I have multiple videos in one component?
**A:** The video component is designed for a single video per instance. To display multiple videos, add multiple video components to your page or use a video gallery/card grid component if available.

---

## Troubleshooting

> **INSTRUCTION:** Document common issues and their solutions. Include at least 5-7 troubleshooting scenarios.

### Video not displaying on published page

**Check:**
- Verify the video file was properly uploaded and is accessible
- Check that the video file path is correct in the Properties panel
- Ensure the video file format is MP4 (H.264 codec)
- Verify file permissions allow the video to be served
- Check browser console for error messages
- If issue persists, try re-uploading the video file

### Video autoplay not working

**Check:**
- Ensure "Muted" option is enabled (required for autoplay in most browsers)
- Verify "Autoplay" option is enabled in Properties panel
- Test in different browsers (some have stricter autoplay policies)
- Check if browser extensions are blocking autoplay
- Note that mobile browsers often block autoplay regardless of settings
- Verify video file is not corrupted

### Video controls not appearing

**Check:**
- Ensure "Controls" option is enabled in the Properties panel
- Verify the video element is properly loaded
- Check browser compatibility (older browsers may not support all features)
- Inspect the page to see if CSS is hiding the controls
- Try disabling and re-enabling the Controls option

### Full-screen video modal not opening

**Check:**
- Verify a full-screen video link has been configured in the component
- Ensure the overlay button is visible and clickable
- Check browser console for JavaScript errors
- Test on a published page (not just in Universal Editor preview)
- Verify the full-screen video file is accessible and in correct format
- Ensure JavaScript is enabled in the browser

### Video not responsive on mobile devices

**Check:**
- Verify video width is set appropriately (100% recommended for mobile)
- Check that CSS responsive styles are loading correctly
- Test on actual mobile devices, not just browser dev tools
- Ensure video container has proper width constraints
- Verify poster image displays correctly on mobile

### Video quality appears poor

**Check:**
- Verify original video file is high quality (1080p or higher recommended)
- Check video compression settings (may be over-compressed)
- Ensure video bitrate is appropriate (2-5 Mbps for HD)
- Test video playback in different browsers
- Consider providing multiple quality versions if possible
- Verify internet connection speed isn't causing quality degradation

### Changes not saving in Universal Editor

**Check:**
- Ensure you've clicked "Save" or "Publish" after making changes
- Verify you have proper editing permissions
- Check if changes are being made to the correct component instance
- Refresh the page and check if changes appear
- Clear browser cache and try again
- Contact AEM administrator if issue persists

### Video plays but audio is missing

**Check:**
- Verify "Muted" option is not enabled if you want audio
- Check video file has audio track (test in video player)
- Ensure browser volume is not muted
- Check system volume settings
- Verify video controls allow unmuting (if Controls enabled)
- Test in different browsers to rule out browser-specific issues

---

## Tips for Success

> **INSTRUCTION:** Provide 5-8 practical tips for using this component effectively.

### Video Optimization

Always optimize your video files before uploading. Use video compression tools to reduce file size while maintaining quality. Aim for file sizes under 10MB for web delivery. Consider the balance between quality and file size - a slightly compressed video that loads quickly is better than a perfect quality video that takes too long to load.

### Poster Image Strategy

Create an engaging poster image that represents your video's key moment or branding. This image displays immediately and improves perceived page load performance. Use a frame from your video or a custom-designed thumbnail that entices users to play the video.

### Autoplay Best Practices

For background or hero videos, use muted autoplay to create an engaging experience without disrupting users. Always provide controls so users can pause or adjust the video. Remember that mobile browsers often restrict autoplay, so ensure your poster image is compelling enough to encourage manual playback.

### Content Overlay Design

When adding text or buttons over videos, ensure sufficient contrast for readability. Use text shadows, semi-transparent backgrounds, or strategic positioning to make overlays visible. Keep overlay content minimal and focused - too much text can distract from the video content.

### Testing Across Devices

Always test video playback on multiple devices and browsers before publishing. Desktop and mobile experiences can differ significantly, especially regarding autoplay behavior. Test on actual devices, not just browser developer tools, to ensure the best user experience.

### Accessibility Considerations

- Provide captions or transcripts for video content
- Ensure video controls are keyboard accessible
- Use descriptive poster images with alt text
- Test with screen readers to ensure proper announcements
- Consider users with motion sensitivity when using autoplay

### Performance Optimization

- Use appropriate video dimensions (don't upload 4K for web display)
- Compress videos appropriately for web delivery
- Consider lazy loading for videos below the fold
- Use poster images to improve initial page load
- Monitor page load times and adjust video quality if needed

### User Experience Enhancement

- Keep hero/background videos short (15-30 seconds)
- Use loop for background videos that should play continuously
- Provide clear call-to-action buttons over video content
- Make it easy for users to pause or skip videos
- Consider user bandwidth when deciding on video quality

---

## Quick Reference

> **INSTRUCTION:** Provide a concise summary of key specifications and settings. This should be scannable at a glance.

**Recommended Video Format**: MP4 (H.264 codec)  
**Recommended Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)  
**Maximum File Size**: Under 10MB (under 5MB for hero videos)  
**Recommended Duration**: 15-30 seconds for hero/background videos  
**Video Width Options**: 100% (default), 75%, 50%  
**Available Options**: Autoplay, Loop, Muted, Controls  
**Aspect Ratio**: 16:9 standard (component supports various ratios)  
**Poster Image Format**: JPG, PNG, or WebP (under 200KB recommended)

---

*Last Updated: December 2024*  
*For technical documentation, see DEVELOPER.md*  
*For AEM Universal Editor support, contact your AEM administrator*


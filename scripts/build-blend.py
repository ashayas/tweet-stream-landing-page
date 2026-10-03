"""Convert the website's exact procedural rink into an editable Blender scene.
Usage: blender --background --python scripts/build-blend.py -- /absolute/path/to/landing-page
First run scripts/export-arena.mjs against the local dev server.
"""
import bpy, sys, os, math
from mathutils import Vector
root = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else os.getcwd()
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=os.path.join(root, 'assets', 'open-ice-arena.glb'))
scene=bpy.context.scene
scene.render.engine='CYCLES'
scene.cycles.samples=48
scene.render.resolution_x=1600
scene.render.resolution_y=1100
scene.render.resolution_percentage=100
scene.world.color=(0.08,0.14,0.22)
# The glTF import rotates the browser's Y-up coordinates into Blender's Z-up.
bpy.ops.object.camera_add(location=(13,-18,16))
camera=bpy.context.object
camera.name='Open Ice • editorial camera'
camera.rotation_euler=(Vector((0,0,0))-camera.location).to_track_quat('-Z','Y').to_euler()
camera.data.type='ORTHO'
camera.data.ortho_scale=20
scene.camera=camera
for name, location, energy, size, color in [
  ('Key • softbox',(-4,-3,13),2000,9,(0.82,0.94,1.0)),
  ('Rim • electric blue',(3,7,8),1600,7,(0.25,0.64,1.0)),
  ('Fill • ice',(8,-7,5),850,8,(0.85,0.95,1.0))]:
    bpy.ops.object.light_add(type='AREA',location=location)
    light=bpy.context.object;light.name=name;light.data.energy=energy;light.data.shape='DISK';light.data.size=size;light.data.color=color
    light.rotation_euler=(-light.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.69))
floor=bpy.context.object;floor.name='Midnight studio floor'
mat=bpy.data.materials.new('Midnight blue');mat.diffuse_color=(.035,.09,.16,1);floor.data.materials.append(mat)
# Pack the generated ice/scoreboard textures for a fully portable .blend.
bpy.ops.file.pack_all()
scene.render.filepath=os.path.join(root,'assets','open-ice-render.png')
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(root,'assets','open-ice-arena.blend'))
print('Saved portable native Blender scene, with packed textures and studio lighting.')
